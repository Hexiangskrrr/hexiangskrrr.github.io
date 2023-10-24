document.getElementById('openTabs').addEventListener('click', () => {
  const videoFilesInput = document.getElementById('videoFiles');
  const videoFiles = videoFilesInput.files;

  // Check if at least one video file is selected
  if (videoFiles.length === 0) {
      alert('Please select one or more video files.');
      return;
  }

  // Create tabs dynamically for each video file
  const tabs = [];

  for (let i = 0; i < videoFiles.length; i++) {
      const videoFile = videoFiles[i];
      const tab = window.open(`tab.html?index=${i}`, `Tab${i + 1}`);
      tabs.push(tab);

      // Send the video file data to the tab
      tab.addEventListener('load', () => {
          tab.postMessage({ action: 'loadVideo', file: videoFile, index: i }, '*');
      });
  }

  // Function to sync video playback
  function syncVideos(action) {
      tabs.forEach(tab => {
          tab.postMessage({ action }, '*');
      });
  }
});