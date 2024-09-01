<template>
  <v-app>
    <v-card>
      <v-layout>
        <!-- app-bar -->
        <v-app-bar color="teal-darken-4" image="https://picsum.photos/1920/1080?random">
          <template v-slot:image>
            <v-img gradient="to top right, rgba(50, 149, 255, 0.8), rgba(0, 190, 255, 0.8)"></v-img>
          </template>          

          <template v-slot:prepend>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
          </template>
          <v-app-bar-title>Title</v-app-bar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-app-bar>
        <!-- navigation-drawer -->
        <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
          <v-list-item prepend-avatar="\assets\images\389530.jpg" title="Nattapon Sappong" nav>
            <template v-slot:append>
              <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
            </template>
          </v-list-item>
          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home" title="หน้าหลัก" value="home" @click="main"></v-list-item>

            <v-list-item prepend-icon="mdi-account-group" title="แสดงข้อมูลผู้ใช้" value="home" @click="data"></v-list-item>

            <v-list-item prepend-icon="mdi-view-dashboard" title="หน้าควบคุม" value="home" @click="dashboard"></v-list-item>

            <v-list-item prepend-icon="mdi-information" title="เกี่ยวกับเรา" value="home" @click="about"></v-list-item>

            <v-list-item prepend-icon="mdi-email" title="ติดต่อเรา" value="home" @click="conn"></v-list-item>

            <v-list-item prepend-icon="mdi-logout" title="Logout" value="users" @click="logOut"></v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-main>
          <NuxtPage></NuxtPage>
        </v-main>

        <v-bottom-navigation v-model="value" :bg-color="color" mode="shift">
          <v-btn>
            <v-icon>mdi-television-play</v-icon>
            <span>Video</span>
          </v-btn>

          <v-btn>
            <v-icon>mdi-music-note</v-icon>
            <span>Music</span>
          </v-btn>

          <v-btn>
            <v-icon>mdi-book-open-page-variant</v-icon>
            <span>Book</span>
          </v-btn>

          <v-btn>
            <v-icon>mdi-image</v-icon>
            <span>Image</span>
          </v-btn>
        </v-bottom-navigation>
      </v-layout>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      rail: true,
    };
  },
  methods: {
    // กดแล้วเชื่อมไปหน้าต่างๆได้
    main() {
      this.$router.replace("/home");
    },

    data() {
      this.$router.replace("/data_table");
    },

    dashboard() {
      this.$router.replace("/dashboard");
    },

    about() {
      this.$router.replace("/about");
    },

    conn() {
      this.$router.replace("/connect");
    },

  
    // ล็อกเอาท์
    logOut() {
      window.sessionStorage.clear();
      this.$router.replace("/login");
    },
  },
};
</script>

<style scoped>
/* สีสำหรับแถบด้านบน */
.v-app-bar {
  background-color: #2965c0; /* สีม่วงเข้ม */
  color: #FFFFFF; /* สีขาว */
}

/* สีสำหรับ Navigation Drawer */
.v-navigation-drawer {
  background-color: #2965c0; /* สีม่วงเข้มขึ้น */
  color: #FFFFFF; /* สีขาว */
}

/* สีสำหรับ Bottom Navigation */
.v-bottom-navigation {
  background-color: #4790ff; /* สีน้ำเงินเข้ม */
  color: #FFFFFF; /* สีขาว */
}

/* สีของไอคอนในแถบเครื่องมือ */
.v-icon {
  color: #FFFFFF !important; /* สีขาวสำหรับไอคอน */
}

/* สีของรายการใน Navigation Drawer */
.v-list-item {
  color: #FFFFFF !important; /* สีขาวสำหรับรายการ */
}

/* สีของปุ่ม */
.v-btn {
  background-color: #2965c0 !important; /* สีม่วงปานกลาง */
  color: #FFFFFF !important; /* สีขาว */
}

.v-btn--text {
  color: #2965c0 !important; /* สีม่วงสำหรับปุ่มที่เป็นข้อความ */
}

/* สีสำหรับ System Bar */
.v-system-bar {
  background-color: #2965c0 !important; /* สีม่วงเข้ม */
  color: #FFFFFF !important; /* สีขาว */
}

</style>
