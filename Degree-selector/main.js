const path =require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(path.join(__dirname,'../protos/degree.proto'));
const degreeProto = grpc.loadPackageDefinition(packageDefinition);

const Degree = [
    {
        id: 100,
        degreeId: 1000,
        title: 'Engineering',
        major: 'Electronics'
    },
    {
        id: 200,
        degreeId: 2000,
        title: 'Engineering',
        major: 'Computer Science'
    },
    {
        id: 300,
        degreeId: 3000,
        title: 'Engineering',
        major: 'Telecommunication'
    },
    {
        id: 400,
        degreeId: 4000,
        title: 'Commerce',
        major: 'Accounts'
    }
]

function findDegree (call,callback){
    let degree = Degree.find((degree) => degree.degreeId == call.request.id);
    if(degree) {
        callback(null, degree);
    }else{
        callback({
            message:'Degree Not Found',
            code:grpc.status.INVALID_ARGUMENT
        });
    }
}

const server = new grpc.Server();

server.addService(degreeProto.Degrees.service,{
    Find:findDegree
});

server.bindAsync('0.0.0.0:50051',grpc.ServerCredentials.createInsecure(),()=>{
    server.start();
})