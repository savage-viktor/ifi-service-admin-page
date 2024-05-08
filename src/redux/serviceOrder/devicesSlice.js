import { createSlice, nanoid } from "@reduxjs/toolkit";

export const devicesInitialState = [
  {
    id: nanoid(),
    model: null,
    imei: "",
    imeiInner: "",
    service: null,
    complectation: [],
    amount: "0",
  },
];

const devicesSlice = createSlice({
  name: "serviceOrder/devices",
  initialState: devicesInitialState,
  reducers: {
    addDevice(state, action) {
      state.push({
        id: nanoid(),
        model: null,
        imei: "",
        imeiInner: "",
        service: "",
        complectation: [],
        amount: "0",
      });
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
  },
});

export const {
  addDevice,
  clearDevice,
  deleteDevice,
  setDeviceModel,
  setDeviceImei,
  setDeviceService,
  setDeviceComplectation,
  setDeviceAmount,
} = devicesSlice.actions;
export const devicesReducer = devicesSlice.reducer;
