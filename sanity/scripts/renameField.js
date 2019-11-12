import client from 'part:@sanity/base/client'
import yargs from 'yargs'

// h/t https://www.sanity.io/docs/migrating-data

// usage notes:
// sanity exec \
//   scripts/renameField.js \
//   --with-user-token -- \
//   --oldField fieldName \
//   --newField fieldName \
//   --type typeToTarget

const argv = require('yargs').argv

if (!argv.oldField) {
  console.log('Missing --oldField')
}

if (!argv.newField) {
  console.log('Missing --newField')
}

if (!argv.type) {
  console.log('Missing --type')
}

if (argv.dry) {
  console.log('Doing a dry run')
}

const { dry, oldField, newField, type } = argv

const fetchDocuments = () =>
  client.fetch(`*[_type == '${type}' && defined(${oldField})][0...100] {_id, _rev, ${oldField}}`)

const buildPatches = docs =>
  docs.map(doc => ({
    id: doc._id,
    patch: {
      set: {[newField]: doc[oldField]},
      unset: [oldField],
      // this will cause the transaction to fail if the documents has been
      // modified since it was fetched.
      ifRevisionID: doc._rev
    }
  }))

const createTransaction = patches =>
  patches.reduce((tx, patch) => tx.patch(patch.id, patch.patch), client.transaction())

const commitTransaction = tx => tx.commit()

const migrateNextBatch = async () => {
  const documents = await fetchDocuments()
  const patches = buildPatches(documents)
  if (patches.length === 0) {
    console.log('No more documents to migrate!')
    return null
  }
  console.log(
    `Migrating batch:\n %s`,
    patches.map(patch => `${patch.id} => ${JSON.stringify(patch.patch)}`).join('\n')
  )
  const transaction = createTransaction(patches)
  if (dry) {
    console.log(`Would commit transaction, but doing a dry run - run again without --dry to save data`)
    process.exit()
  } else {
    await commitTransaction(transaction)
  }
  return migrateNextBatch()
}

const renameField = () => {
  migrateNextBatch().catch(err => {
    console.error(err)
    process.exit(1)
  })
}

renameField()

