<template>
  <v-container fluid class="pa-4" style="background-color: #f5f5f5;">
    <v-row justify="center" class="mb-5">
      <v-col cols="12" md="6">
        <v-card class="pa-5" color="#fff" elevation="3">
          <v-row align="center">
            <v-col>
              <h4 class="text-center mb-5">Program MQTTX</h4>
            </v-col>
          </v-row>

          <v-row class="mb-4">
            <v-col cols="12" class="text-center">
              <v-btn
                class="ma-2"
                color="primary"
                large
              >
                {{ status || 'Not Connected' }}
                <v-icon icon="mdi-checkbox-marked-circle" end></v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <v-row class="mb-4">
            <v-col cols="12" md="6" class="text-center">
              <h4>SW 1</h4>
              <v-progress-circular :model-value="value1" :rotate="360" :size="100" :width="15" color="teal">
                <template v-slot:default> {{ value1 }} % </template>
              </v-progress-circular>
              <v-col cols="auto">
                <v-btn class="v-btn1" size="small" color="success" @click="on1">ON</v-btn> 
                <v-btn class="v-btn2" @click="off1" size="small">OFF</v-btn>
              </v-col>

            </v-col>
            <v-col cols="12" md="6" class="text-center">
              <h4>SW 2</h4>
              <v-progress-circular :model-value="value2" :rotate="360" :size="100" :width="15" color="red">
                <template v-slot:default> {{ value2 }} % </template>
              </v-progress-circular>
              <v-col cols="auto">
                <v-btn size="small" color="success" @click="on2">ON</v-btn>
                <v-btn @click="off2" size="small">OFF</v-btn>
              </v-col>
            </v-col>
          </v-row>

          <v-row class="mb-3">
            <v-col cols="12">
            </v-col>
          </v-row>

          <v-row class="text-center">
            <v-col>
              
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
      this.value1 = 80;
      this.client.publish("room/sw01", String("ON"));
    },

    on2() {
      this.value2 = 80;
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

<style>
body {
  background-color: #f5f5f5; /* Light grey background for the whole page */
}

.v-card {
  border-radius: 8px;
  background-color: #ffffff; /* White background for the card */
}

.text-center {
  text-align: center;
}

/* Color Palette */
.primary-bg {
  background-color: #4a148c; /* Dark Purple */
}

.secondary-bg {
  background-color: #1e88e5; /* Blue */
}

.accent-bg {
  background-color: #e1bee7; /* Light Purple */
}

.accent-text {
  color: #4a148c; /* Dark Purple text */
}

.btn-on {
  background-color: #4a148c; /* Dark Purple */
  color: #ffffff; /* White text */
}

.btn-off {
  background-color: #1e88e5; /* Blue */
  color: #ffffff; /* White text */
}

.progress-circular {
  color: #4a148c; /* Dark Purple progress circle */
}

/* Margins */
.mb-3, .mb-4, .mb-5 {
  margin-bottom: 1rem;
}

/* Button Styles */
.v-btn {
  border-radius: 4px; /* Rounded corners for buttons */
}

.v-btn:hover {
  opacity: 0.8; /* Slightly transparent on hover */
}
</style>
