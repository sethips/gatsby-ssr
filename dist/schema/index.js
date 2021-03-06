"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _ = require(`lodash`);
const { GraphQLSchema, GraphQLObjectType } = require(`graphql`);

const buildNodeTypes = require(`./build-node-types`);
const buildNodeConnections = require(`./build-node-connections`);
const { store } = require(`../redux`);
const invariant = require(`invariant`);

module.exports = async () => {
  const typesGQL = await buildNodeTypes();
  const connections = buildNodeConnections(_.values(typesGQL));

  // Pull off just the graphql node from each type object.
  const nodes = _.mapValues(typesGQL, `node`);

  invariant(!_.isEmpty(nodes), `There are no available GQL nodes`);
  invariant(!_.isEmpty(connections), `There are no available GQL connections`);

  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: `RootQueryType`,
      fields: (0, _extends3.default)({}, connections, nodes)
    })
  });

  store.dispatch({
    type: `SET_SCHEMA`,
    payload: schema
  });
};
//# sourceMappingURL=index.js.map