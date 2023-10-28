<script setup>
import config from "./configSDK";
</script>

<template>
  <div
    id="cesdk_container"
    style="height: 100vh; width: 100vw; margin: 0; padding: 0"
  ></div>
</template>

<script>
import CreativeEditorSDK from "@cesdk/cesdk-js";

export default {
  name: "CreativeEditorSDK",

  props: { config: config },

  _cesdk: null,

  mounted: function mounted() {
    console.log(this.config);
    CreativeEditorSDK.create("#cesdk_container", config).then(
      async (instance) => {
        this._cesdk = instance;
        // Do something with the instance of CreativeEditor SDK, for example:
        // Populate the asset library with default / demo asset sources.
        instance.addDefaultAssetSources();
        instance.addDemoAssetSources({ sceneMode: "Design" });
        await instance.createDesignScene();
      }
    );
  },

  methods: {},

  watch: {},

  beforeDestroy: function beforeDestroy() {
    if (this._cesdk) {
      this._cesdk.dispose();
      this._cesdk = null;
    }
  },
};
</script>
