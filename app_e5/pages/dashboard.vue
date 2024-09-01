<template>
  <v-container fluid class="pa-4" style="background-color: #f5f5f5;">
    <v-row justify="center" class="mb-5">
      <v-col class="box_container" ols="12" md="8" lg="6">
        <v-card class="pa-5 elevation-12 rounded-xl" color="#ffffff">
          <div class="Program">         
                <h4 class="TEXT">Program MQTTX</h4>
          </div>
          <v-row class="mb-4">
            <v-col cols="12" class="text-center">
              <v-btn
                class="ma-2 rounded-pill"
                color="primary"
                large
              >
                {{ status || 'Not Connected' }}
                <v-icon class="ml-2" icon="mdi-checkbox-marked-circle"></v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <v-row class="mb-4">
            <v-col cols="12" md="6" class="text-center">
              <h4 class="font-weight-bold mb-3">SW 1</h4>
              <v-row align="center" justify="center">
                <v-col class="d-flex align-center justify-center" cols="auto">
                  <v-btn class="btn-on mx-1" size="small" @click="on1">ON</v-btn>
                </v-col>
                <v-col class="d-flex align-center" cols="auto">
                  <v-progress-circular :model-value="value1" :rotate="360" :size="100" :width="15" color="#4a148c">
                    <template v-slot:default> {{ value1 }} % </template>
                  </v-progress-circular>
                </v-col>
                <v-col class="d-flex align-center justify-center" cols="auto">
                  <v-btn class="btn-off mx-1" size="small" @click="off1">OFF</v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="6" class="text-center">
              <h4 class="font-weight-bold mb-3">SW 2</h4>
              <v-row align="center" justify="center">
                <v-col class="d-flex align-center justify-center" cols="auto">
                  <v-btn class="btn-on1 mx-1" size="small" @click="on2">ON</v-btn>
                </v-col>
                <v-col class="d-flex align-center" cols="auto">
                  <v-progress-circular :model-value="value2" :rotate="360" :size="100" :width="15" color="red">
                    <template v-slot:default> {{ value2 }} % </template>
                  </v-progress-circular>
                </v-col>
                <v-col class="d-flex align-center justify-center" cols="auto">
                  <v-btn class="btn-off1 mx-1" size="small" @click="off2">OFF</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
import mqtt from "mqtt";
export default {
  data() {
    return {
      id: 1,
      msg: "",
      status: "",
      value1: 0,
      value2: 0,
      client: null,
    };
  },

  created() {
    this.client = mqtt.connect("ws://broker.emqx.io:8083/mqtt");
    this.client.on("connect", this.onMqttConnect);
    this.client.on("message", this.onMqttMessage);
    this.client.on("reconnect", this.handleOnReConnect);
  },

  beforeDestroy() {
    this.client && this.client.end();
  },

  methods: {
    on1() {
      this.value1 = 69;
      this.client.publish("room/sw01", String("ON"));
    },

    on2() {
      this.value2 = 56;
      this.client.publish("room/sw02", String("ON"));
    },

    off1() {
      this.value1 = 0;
      this.client.publish("room/sw01", String("OFF"))
    },

    off2() {
      this.value2 = 0;
      this.client.publish("room/sw02", String("OFF"));
      
    },

    onMqttConnect() {
      this.status = "Mqtt connected";
      this.client.publish("op", "status");
      this.client.subscribe("status");
      this.client.subscribe("room/sw01");
    },

    onMqttMessage(topic, message) {
      if (topic === "status") {
        this.msg = message.toString();
      }
      if (topic === "room/sw01") {
        this.value = parseInt(message.toString(), 10);
      }
      if (topic === "room/sw02") {
        this.value = parseInt(message.toString(), 10);
      }
    },

    handleOnReConnect() {
      this.status = "Mqtt Reconnecting...";
      if (this.retryTimes > 5) {
        this.client.end();
        this.status = "Mqtt Disconnected";
      }
    },
  },
};
</script>

<style scoped>
/* Global Styles */
body {
  background-color: #202020; /* Light grey background for the whole page */
}

.box_container {
  transition: 0.2s;
}

.box_container:hover {
  background-color: #2965c0;
  border-radius: 30px;
  box-shadow: 0px 0px 10px 5px #6c9ee9;
}

.Program {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
}

.TEXT {
  background-color: #2965c0;
  padding: 15px;
  border-radius: 15px;
  margin-bottom: 40px;
  transition: 0.2s;
}

.TEXT:hover {
  background-color: #6c9ee9;
}

/* Card Styles */
.v-card {
  border-radius: 12px; /* Rounded corners for the card */
}

.v-card:hover {
  box-shadow: 0px 0px 10px 5px rgb(147, 147, 147);
}

/* Typography */
h4 {
  font-size: 1.25rem; /* Larger font size for headings */
  color: #ffffff; /* Dark Purple */
}

/* Buttons */
.v-btn {
  border-radius: 20px; /* Rounded corners for buttons */
  transition: 0.2s;
}

/* Button Color Classes */
.btn-on {
  background-color: #4a148c; /* Dark Purple */
  color: #ffffff; /* White text */
}

.btn-on:hover {
  box-shadow: 0px 0px 10px 5px #4a148c;
}

.btn-on1:hover {
  box-shadow: 0px 0px 10px 5px rgb(255, 83, 83);
}

.btn-off {
  background-color: #ffffff; /* Blue */
  color: #000000; /* White text */
}

.btn-off:hover {
    box-shadow: 0px 0px 10px 5px rgb(147, 147, 147);
}

.btn-off1:hover {
  box-shadow: 0px 0px 10px 5px rgb(147, 147, 147);
}

.btn-on1 {
  background-color: red;
  color: #ffffff;
}

/* Progress Circular */
.v-progress-circular {
  color: #4a148c; /* Dark Purple progress circle */
  border-radius: 100px;
  transition: 0.2s;
  
}

/* Progress Circular */
.v-progress-circular:hover {
  box-shadow: 0px 0px 10px 5px rgb(147, 147, 147);
}

/* Flexbox for Buttons and Circular Progress */
.d-flex {
  display: flex;
}

.align-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.mx-1 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

/* Margins */
.mb-3, .mb-4, .mb-5 {
  margin-bottom: 1rem;
}

.v-card {
  height: 420px;
} 

/* Responsive Design */
@media (max-width: 600px) {
  .v-card {
    padding: 2rem; /* Adjust padding for smaller screens */
  }
}
</style>




