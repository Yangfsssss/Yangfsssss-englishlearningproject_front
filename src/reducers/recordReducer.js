import network from "../services/network";

export const initializeRecords = () => {
  return async (dispatch) => {
    const res = await network.getRecords();
    res.ready = true;
    dispatch({
      type: "INIT_RECORDS",
      payload: res
    });
  };
};

export const createNewRecord = (newRecord) => {
  return async (dispatch) => {
    const res = await network.saveRecord(newRecord);
    dispatch({
      type: "NEW_RECORD",
      data: res.data
    });
    return res;
  };
};

export const deleteRecordItem = (recordId, itemId) => {
  return async (dispatch) => {
    const res = await network.deleteItem(itemId);
    dispatch({
      type: "DELETE",
      data: {
        recordId,
        itemId
      }
    });
    return res;
  };
};

const recordReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_RECORDS":
      return action.payload;
    case "NEW_RECORD": {
      if (action.data.wasUpdated) {
        return state.data.map((record) =>
          record.id === action.data.id ? action.data : record
        );
      } else {
        return state.data.concat(action.data);
      }
    }
    case "DELETE": {
      const updatedRecord = state.data.find(
        (record) => record.id === action.data.recordId
      );

      updatedRecord.items = updatedRecord.items.filter(
        (item) => item._id !== action.data.itemId
      );

      return state.data.map((record) =>
        record.id === updatedRecord.id ? updatedRecord : record
      );
    }
    default:
      return state;
  }
};

export default recordReducer;
