const cloudbase = require("@cloudbase/node-sdk");

const app = cloudbase.init({
  env: cloudbase.SYMBOL_CURRENT_ENV
});

const db = app.database();
const collection = db.collection("learning_sync");

exports.main = async (event) => {
  const method = event.httpMethod || event.requestContext?.httpMethod || "GET";

  if (method === "OPTIONS") {
    return response(204, {});
  }

  try {
    if (method === "GET") {
      const syncCode = normalizeCode(event.queryStringParameters?.syncCode || event.queryString?.syncCode || event.syncCode);
      if (!syncCode) {
        return response(400, { message: "缺少同步码" });
      }

      const result = await collection.where({ syncCode }).limit(1).get();
      const record = result.data?.[0];
      if (!record) {
        return response(404, { message: "未找到同步数据" });
      }

      return response(200, {
        progress: record.progress,
        updatedAt: record.updatedAt
      });
    }

    if (method === "POST") {
      const body = parseBody(event.body);
      const syncCode = normalizeCode(body.syncCode);
      if (!syncCode || !body.progress) {
        return response(400, { message: "缺少同步码或学习数据" });
      }

      const updatedAt = new Date().toISOString();
      const existing = await collection.where({ syncCode }).limit(1).get();
      const record = existing.data?.[0];
      const payload = {
        syncCode,
        progress: body.progress,
        updatedAt
      };

      if (record?._id) {
        await collection.doc(record._id).update(payload);
      } else {
        await collection.add(payload);
      }

      return response(200, { updatedAt });
    }

    return response(405, { message: "不支持的请求方法" });
  } catch (error) {
    return response(500, { message: error.message || "同步服务异常" });
  }
};

function parseBody(body) {
  if (!body) {
    return {};
  }
  if (typeof body === "object") {
    return body;
  }
  try {
    return JSON.parse(body);
  } catch {
    return {};
  }
}

function normalizeCode(code) {
  return String(code || "").trim().toUpperCase();
}

function response(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };
}
