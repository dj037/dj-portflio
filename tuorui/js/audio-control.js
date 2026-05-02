/**
 * 音频控制模块
 * 管理背景音乐播放和音量按钮状态
 */

export function initAudioControl() {
  const audioPlayer = document.getElementById('audioPlayer');
  const playBtn = document.getElementById('playBtn');

  if (!audioPlayer || !playBtn) {
    console.warn('Audio player or button not found');
    return;
  }

  /**
   * 更新按钮状态显示
   */
  function updateButtonState() {
    const isPlaying = audioPlayer && !audioPlayer.paused;
    playBtn.textContent = isPlaying ? '🔊' : '🔈';
    playBtn.setAttribute('aria-label', isPlaying ? '暂停背景音乐' : '播放背景音乐');
  }

  /**
   * 切换播放状态
   */
  function togglePlayback(event) {
    event.preventDefault();

    if (!audioPlayer) return;

    if (audioPlayer.paused) {
      // 尝试播放，处理浏览器自动播放限制
      audioPlayer.play()
        .then(() => {
          updateButtonState();
        })
        .catch((error) => {
          console.warn('无法播放音频:', error.message);
          updateButtonState();
        });
    } else {
      // 暂停播放
      audioPlayer.pause();
      updateButtonState();
    }
  }

  // 按钮点击事件
  playBtn.addEventListener('click', togglePlayback);

  // 监听音频播放/暂停事件
  audioPlayer.addEventListener('play', updateButtonState);
  audioPlayer.addEventListener('pause', updateButtonState);

  // 初始化按钮状态
  updateButtonState();

  // 返回控制接口
  return {
    play: () => audioPlayer.play(),
    pause: () => audioPlayer.pause(),
    isPlaying: () => !audioPlayer.paused,
    togglePlayback
  };
}

export default initAudioControl;
