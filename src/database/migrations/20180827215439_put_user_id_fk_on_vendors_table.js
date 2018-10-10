
exports.up = function(knex, Promise) {
  return knex.schema.table('vendors', (vendorsTable)=>{
    vendorsTable.integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('cascade')

    return vendorsTable

  })
};

exports.down = async function(knex, Promise) {
  const fkExists = await knex.schema.hasColumn('vendors', 'user_id')

  return knex.schema.table('vendors',  (vendorsTable)=>{
    if(fkExists){
      vendorsTable.dropForeign('user_id')
      vendorsTable.dropColumn('user_id')
    }
  })
};
