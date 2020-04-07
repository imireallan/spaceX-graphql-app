const axios = require('axios');
const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLBoolean, GraphQLInt, GraphQLString } = require('graphql');

const url = 'https://api.spacexdata.com/v3/launches/';

const makeRequest = args => {
    return args ? axios.get(`${url}${args}`) : axios.get(url);
}


// Launch Type 
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: { type: GraphQLInt },
        mission_name: { type: GraphQLString},
        launch_year: {type: GraphQLString},
        launch_date_local: {type: GraphQLString},
        launch_success: {type: GraphQLBoolean},
        rocket: { type: RocketType }
    })
});

// Rocket Type 
const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: {type: GraphQLString},
        rocket_name: {type: GraphQLString},
        rocket_type: {type: GraphQLString},
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args) { 
                return makeRequest().then(res => res.data)
            }
        },
        launch: {
            type: LaunchType,
            args: {
                flight_number: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args) {
                return makeRequest(args.flight_number).then(res => res.data)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})