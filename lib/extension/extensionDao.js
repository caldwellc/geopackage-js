const Dao = require('../dao/dao');

var ColumnValues = require('../dao/columnValues')
  , TableCreator = require('../db/tableCreator')
  , Extension = require('./extension');

/**
 * Extension Data Access Object
 * @class
 * @extends Dao
 */
class ExtensionDao extends Dao {
  /**
   * Creates an Extension object from the raw database row
   * @param {object} row raw database row
   * @returns {Extension}
   */
  createObject(row) {
    var e = new Extension();
    for (var key in row) {
      e[key] = row[key];
    }
    return e;
  }
  /**
   * Query by extension name and return the first result
   * @param {String} extensionName extension name
   * @returns {Extension}
   */
  queryByExtension(extensionName) {
    var results = this.queryForAllEq(ExtensionDao.COLUMN_EXTENSION_NAME, extensionName);
    if (!results[0]) return;
    var e = this.createObject(results[0]);
    return e;
  }
  /**
   * Query by extension name and return all results
   * @param {String} extensionName extension name
   * @returns {Extension[]}
   */
  queryAllByExtension(extensionName) {
    var extensions = [];
    for (var row of this.queryForAllEq(ExtensionDao.COLUMN_EXTENSION_NAME, extensionName)) {
      var e = this.createObject(row);
      extensions.push(e);
    }
    return extensions;
  }
  /**
   * Query by extension name and table name and return all results
   * @param {String} extensionName extension name
   * @param {String} tableName table name
   * @returns {Extension[]}
   */
  queryByExtensionAndTableName(extensionName, tableName) {
    var values = new ColumnValues();
    values.addColumn(ExtensionDao.COLUMN_EXTENSION_NAME, extensionName);
    values.addColumn(ExtensionDao.COLUMN_TABLE_NAME, tableName);
    var extensions = [];
    for (var row of this.queryForFieldValues(values)) {
      var e = this.createObject(row);
      extensions.push(e);
    }
    if (extensions.length) {
      return extensions;
    }
    else {
      return;
    }
  }
  /**
   * Query by extension name and table name and return all results
   * @param {String} extensionName extension name
   * @param {String} tableName table name
   * @param {String} columnName column name
   * @returns {Extension[]}
   */
  queryByExtensionAndTableNameAndColumnName(extensionName, tableName, columnName) {
    var values = new ColumnValues();
    values.addColumn(ExtensionDao.COLUMN_EXTENSION_NAME, extensionName);
    values.addColumn(ExtensionDao.COLUMN_TABLE_NAME, tableName);
    values.addColumn(ExtensionDao.COLUMN_COLUMN_NAME, columnName);
    var extensions = [];
    for (var row of this.queryForFieldValues(values)) {
      var e = this.createObject(row);
      extensions.push(e);
    }
    return extensions;
  }
  /**
   * Creates the extensions table
   */
  createTable() {
    var tc = new TableCreator(this.geoPackage);
    return tc.createExtensions();
  }
  /**
   * Deletes all extension entries with this name
   * @param {String} extensionName extension name to delete
   * @returns {Number} Number of extensions deleted
   */
  deleteByExtension(extensionName) {
    var values = new ColumnValues();
    values.addColumn(ExtensionDao.COLUMN_EXTENSION_NAME, extensionName);
    return this.deleteWhere(this.buildWhere(values, '='), this.buildWhereArgs(values));
  }
  /**
   * Deletes all extension entries with this name and table name
   * @param {String} extensionName extension name to delete
   * @param {String} tableName table name to delete
   * @returns {Number} Number of extensions deleted
   */
  deleteByExtensionAndTableName(extensionName, tableName) {
    var values = new ColumnValues();
    values.addColumn(ExtensionDao.COLUMN_EXTENSION_NAME, extensionName);
    values.addColumn(ExtensionDao.COLUMN_TABLE_NAME, tableName);
    return this.deleteWhere(this.buildWhere(values, 'and'), this.buildWhereArgs(values));
  }
}

ExtensionDao.TABLE_NAME = "gpkg_extensions";
ExtensionDao.COLUMN_TABLE_NAME = "table_name";
ExtensionDao.COLUMN_COLUMN_NAME = "column_name";
ExtensionDao.COLUMN_EXTENSION_NAME = "extension_name";
ExtensionDao.COLUMN_DEFINITION = "definition";
ExtensionDao.COLUMN_SCOPE = "scope";

ExtensionDao.prototype.gpkgTableName = ExtensionDao.TABLE_NAME;
ExtensionDao.prototype.idColumns = [ExtensionDao.COLUMN_TABLE_NAME, ExtensionDao.COLUMN_COLUMN_NAME, ExtensionDao.COLUMN_EXTENSION_NAME];

module.exports = ExtensionDao;