const Model = require('./Model');

class GroomerMedia extends Model {
  constructor() {
    super();
    this.tableName = 'groomer_medias';

    this.validationSchema = {
      type: 'object',
      required: ['groomer_id', 'url'],
      properties: {
        groomer_id: {
          type: 'string',
          oneOf: { key: 'id', target: 'groomers' },
        },
        url: { type: 'string', format: 'uri' },
        description: { type: 'string' },
      },
    };
  }
}

module.exports = new GroomerMedia();
