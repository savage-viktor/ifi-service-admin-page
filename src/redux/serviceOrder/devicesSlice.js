import { createSlice, nanoid } from "@reduxjs/toolkit";

export const devicesInitialState = [
  {
    id: nanoid(),
    model: null,
    imei: "",
    imeiInner: "",
    service: null,
    comment: "",
    complectation: [],
    amount: "0",
  },
];

const devicesSlice = createSlice({
  name: "serviceOrder/devices",
  initialState: devicesInitialState,
  reducers: {
    setDevices(state, action) {
      return action.payload;
    },

    addDevice(state, action) {
      for (let i = 0; i < action.payload; i++) {
        state.push({
          id: nanoid(),
          model: state.length ? state[state.length - 1].model : null,
          imei: "",
          imeiInner: "",
          service: state.length ? state[state.length - 1].service : "",
          complectation: state.length
            ? state[state.length - 1].complectation
            : [],
          amount: state.length ? state[state.length - 1].amount : "0",
        });
      }
    },

    clearDevice(state, action) {
      // state.service = "";
      // state.amount = "0";
      state.map((device) => {
        if (device.id === action.payload.id) {
          device.service = null;
          device.amount = "0";
        }
        return device;
      });
    },

    deleteDevice(state, action) {
      state.splice(action.payload, 1);
    },

    setDeviceModel(state, action) {
      state.map((device) => {
        if (device.id === action.payload.id) {
          device.model = action.payload.value;
        }
        return device;
      });
    },

    setDeviceImei(state, action) {
      state.map((device) => {
        if (device.id === action.payload.id) {
          device.imei = action.payload.value;
        }
        return device;
      });
    },

    setDeviceImeiInner(state, action) {
      state.map((device) => {
        if (device.id === action.payload.id) {
          device.imeiInner = action.payload.value;
        }
        return device;
      });
    },

    setDeviceService(state, action) {
      state.map((device) => {
        if (device.id === action.payload.id) {
          device.service = action.payload.value;
        }
        return device;
      });
    },

    setDeviceComplectation(state, action) {
      state.map((device) => {
        if (device.id === action.payload.id) {
          device.complectation = action.payload.value;
        }
        return device;
      });
    },

    setDeviceAmount(state, action) {
      state.map((device) => {
        if (device.id === action.payload.id) {
          device.amount = action.payload.value;
        }
        return device;
      });
    },

    setDeviceImeiArray(state, action) {
      let qwerty = action.payload.split("\n");

      state.map((device, index) => {
        if (qwerty[index]) {
          console.log(qwerty[index]);
          device.imei = qwerty[index];
        }
      });
    },
  },
});

export const {
  setDevices,
  addDevice,
  clearDevice,
  deleteDevice,
  setDeviceModel,
  setDeviceImei,
  setDeviceImeiInner,
  setDeviceService,
  setDeviceComplectation,
  setDeviceAmount,
  setDeviceImeiArray,
} = devicesSlice.actions;
export const devicesReducer = devicesSlice.reducer;
