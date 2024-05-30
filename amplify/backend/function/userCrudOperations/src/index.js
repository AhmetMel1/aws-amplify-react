const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "user-dev";
const { v4 } = require("uuid");

exports.handler = async (event) => {
  const { httpMethod, body } = event;
  let response;

  try {
    switch (httpMethod) {
      case "GET":
        response = await getUsers();
        break;
      case "POST":
        response = await createUser(JSON.parse(body));
        break;
      case "PUT":
        response = await updateUser(JSON.parse(body));
        break;
      case "DELETE":
        const id = event.path.split("/").pop();
        response = await deleteUser(id);
        break;
      default:
        response = errorResponse(405, "Method Not Allowed");
    }
  } catch (err) {
    response = errorResponse(500, "Internal Server Error: " + err.message);
  }
  return response;
};

const getUsers = async () => {
  const result = await docClient
    .scan({
      TableName: TABLE_NAME,
    })
    .promise();

  return successResponse(200, result.Items);
};

const createUser = async (data) => {
  const newItem = { ...data, id: v4() };
  const params = {
    TableName: TABLE_NAME,
    Item: newItem,
  };

  await docClient.put(params).promise();

  return successResponse(201, data);
};
const updateUser = async (data) => {
  let updateExpression = "set ";
  let ExpressionAttributeNames = {};
  let ExpressionAttributeValues = {};

  for (const property in data) {
    if (property !== "id") {
      updateExpression += ` #${property} = :${property} ,`;
      ExpressionAttributeNames["#" + property] = property;
      ExpressionAttributeValues[":" + property] = data[property];
    }
  }

  updateExpression = updateExpression.slice(0, -2);

  const params = {
    TableName: TABLE_NAME,
    Key: { id: data.id },
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: ExpressionAttributeNames,
    ExpressionAttributeValues: ExpressionAttributeValues,
    ReturnValues: "ALL_NEW",
  };

  const result = await docClient.update(params).promise();

  return successResponse(200, result.Attributes);
};

const deleteUser = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id: id },
  };

  await docClient.delete(params).promise();

  return successResponse(204, null);
};

const successResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body),
  };
};

const errorResponse = (statusCode, message) => {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message }),
  };
};
