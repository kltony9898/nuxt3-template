export const useVideoFrame = (fileURL: string, time: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.src = fileURL
    video.style.display = 'none'

    const handleLoadedDataEvent = () => {
      video.currentTime = time
    }

    const handleSeekedEvent = () => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        const thumbnailURL = canvas.toDataURL('image/png')
        resolve(thumbnailURL)
        canvas.remove()
        video.removeEventListener('loadeddata', handleLoadedDataEvent)
        video.removeEventListener('seeked', handleSeekedEvent)
      } else {
        reject(new Error('Failed to get canvas context'))
      }
    }

    video.addEventListener('loadeddata', handleLoadedDataEvent)
    video.addEventListener('seeked', handleSeekedEvent)
  })
}
