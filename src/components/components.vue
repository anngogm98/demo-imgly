<script setup>
import CreativeEngine from "https://cdn.img.ly/packages/imgly/cesdk-engine/1.17.0/index.js";

defineProps({
  msg: {
    type: String,
    required: true,
  },
});

const config = {
  // baseURL: "https://cdn.img.ly/packages/imgly/cesdk-engine/1.17.0/assets",
};

const exportButton = document.getElementById("export_button");
console.log(document.getElementsByTagName("cesdk-canvas"));

CreativeEngine.init(
  config,
  document.getElementsByTagName("cesdk-canvas").get(0)
).then(async (instance) => {
  await instance.addDefaultAssetSources();
  // await instance.scene.loadFromURL(
  //   "https://cdn.img.ly/assets/demo/v1/ly.img.template/templates/cesdk_postcard_1.scene"
  // );
  exportButton.removeAttribute("disabled");

  exportButton.onclick = async () => {
    /* Export scene as PNG image. */
    const scene = instance.scene.get();
    const mimeType = "image/png";
    const options = { pngCompressionLevel: 9 };
    const blob = await instance.block.export(scene, mimeType, options);

    /* Download blob. */
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    anchor.download = "export.png";
    anchor.click();
  };
});
</script>

<template>
  <div><button id="export_button" disabled>Export</button></div>
</template>

<style scoped></style>
