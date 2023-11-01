const onLoad = () => {
  return new Promise((resolve, reject) => {
    // Tạo một input element để cho phép người dùng chọn file
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.style.display = "none";

    // Khi người dùng chọn file, đọc nội dung của file
    input.addEventListener("change", (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      // Xử lý khi đọc file thành công
      reader.onload = (fileEvent) => {
        const imageData = fileEvent.target.result;
        console.log(imageData);
        // imageData là dữ liệu hình ảnh dưới dạng base64 hoặc URL
        // Thực hiện các xử lý với dữ liệu hình ảnh nếu cần
        resolve(imageData);
      };

      // Xử lý khi đọc file gặp lỗi
      reader.onerror = (fileEvent) => {
        reject(fileEvent.target.error);
      };

      // Bắt đầu đọc file
      reader.readAsText(file);
    });

    // Trigger sự kiện click cho input element để hiển thị hộp thoại chọn file
    input.click();
  });
};

const config = {
  ui: {
    elements: {
      view: "default", // 'default' or 'advanced'
      navigation: {
        show: true, // 'false' to hide the navigation completely
        position: "top", // 'top' or 'bottom'
        action: {
          close: true, // true or false
          back: true, // true or false
          load: true, // true or false
          save: true, // true or false
          export: {
            show: true,
            format: ["image/png"],
          },
          download: true, // true  or false
          custom: [
            {
              label: "common.custom", // string or i18n key
              iconName: "default", // one of 'default', 'download', 'upload', or 'save'
              callback: () => {
                // callback signature is `() => void | Promise<void>`
                // place custom functionality here
              },
            },
          ],
        },
      },
      panels: {
        inspector: {
          show: true, // true or false
          position: "left", // 'left' or 'right'
        },
        assetLibrary: {
          show: true, // true or false
          position: "left", // 'left' or 'right'
        },
        settings: {
          show: true, // true or false
        },
      },
      dock: {
        iconSize: "large", // 'large' or 'normal'
        hideLabels: false, // false or true
        groups: [
          {
            id: "ly.img.template", // string
            entryIds: ["ly.img.template"], // string[]
          },
          {
            id: "ly.img.defaultGroup", // string
            showOverview: true, // true or false
          },
        ],
        defaultGroupId: "ly.img.defaultGroup", // string
      },
      libraries: {
        insert: {
          entries: (defaultEntries) => defaultEntries,
          floating: true, // true or false
          autoClose: false, // true or false
        },
        replace: {
          entries: (defaultEntries) => defaultEntries,
          floating: true, // true or false
          autoClose: false, // true or false
        },
      },
      blocks: {
        opacity: false, // true  or false
        transform: false, // true  or false
        "//ly.img.ubq/image": {
          adjustments: true, // true  or false
          filters: false, // true  or false
          effects: false, // true  or false
          blur: true, // true  or false
          crop: false, // true  or false
        },
        "//ly.img.ubq/page": {
          manage: true,
          format: true,
          maxDuration: 30 * 60,
        },
      },
    },
  },
  callbacks: {
    onUpload: "local", // Enable local uploads in Asset Library.
    onSave: async (scene) => {
      // Save to DB
      alert("Save to DB");
    },
    // Import Design File
    //onLoad,
    onLoad: onLoad,
    // (a) => {
    //   window.alert("Load callback!");
    //   const scene = "..."; // Fill with sene
    //   console.log(a);
    //   return Promise.resolve(scene);
    // },
    // Export Images
    onExport: (blobs, options) => {
      console.log(options);
      console.log(blobs);
      const anchor = document.createElement("a");
      anchor.href = URL.createObjectURL(blobs[0]);
      anchor.download = "export.png";
      anchor.click();
      return Promise.resolve();
    },
    // Uploads => Add File / Su dung default co roi
    // onUpload: (file, onProgress) => {
    //   window.alert("Upload callback!");
    //   const newImage = {
    //     // id: "exampleImageIdentifier",
    //     // meta: {
    //     //   uri: "https://YOURSERVER/images/file.jpg",
    //     //   thumbUri: "https://YOURSERVER/images/thumb.jpg",
    //     // },
    //   };
    //   return Promise.resolve(newImage);
    // },

    // Export Design File
    onDownload: (scene) => {
      // Cái này docs không có
      console.log(scene);
      const blob = new Blob([scene], { type: "application/octet-stream" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "download.scene");
      link.click();
    },
  },
};

export default config;
