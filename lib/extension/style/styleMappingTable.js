/**
 * @memberOf module:extension/style
 * @class StyleMappingTable
 */

var UserMappingTable = require('../relatedTables/userMappingTable')
  , UserCustomColumn = require('../../user/custom/userCustomColumn')
  , DataTypes = require('../../db/dataTypes');

/**
 * Contains style mapping table factory and utility methods
 * @extends UserMappingTable
 * @param  {string} tableName table name
 * @param  {module:user/userColumn~UserColumn[]} columns   style mapping columns
 * @constructor
 */
class StyleMappingTable extends UserMappingTable {
  /**
   * Get the geometry type name column index
   * @return int
   */
  getGeometryTypeNameColumnIndex() {
    return this.getColumnIndex(StyleMappingTable.COLUMN_GEOMETRY_TYPE_NAME);
  }
  /**
   * Get the geometry type name column
   * @return {module:user/userColumn~UserColumn}
   */
  getGeometryTypeNameColumn() {
    return this.getColumnWithColumnName(StyleMappingTable.COLUMN_GEOMETRY_TYPE_NAME);
  }
  /**
   * Creates a user mapping table with the minimum required columns followed by the additional columns
   * @param  {string} tableName name of the table
   * @return {module:extension/relatedTables~UserMappingTable}
   */
  static create(tableName) {
    return new StyleMappingTable(tableName, StyleMappingTable.createColumns());
  }
  /**
   * Create the columns
   * @return {module:user/userColumn~UserColumn[]}
   */
  static createColumns() {
    var columns = UserMappingTable.createRequiredColumns();
    var index = columns.length;
    columns.push(UserCustomColumn.createColumn(index, StyleMappingTable.COLUMN_GEOMETRY_TYPE_NAME, DataTypes.GPKGDataType.GPKG_DT_TEXT, undefined, false, undefined));
    return columns;
  }
}

StyleMappingTable.COLUMN_GEOMETRY_TYPE_NAME = 'geometry_type_name';

module.exports = StyleMappingTable;