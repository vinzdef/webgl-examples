import {qs} from '@okiba/dom'

const chapter = qs('.Chapter')
if (chapter) {
  import(`~/lessons/${chapter.id}`)
    .then(({default: Chapter}) => {
      window[`CHAPTER_${chapter.id}`] = new Chapter()
    })
}


