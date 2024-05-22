'use client'

import s from './ImagePost.module.scss'
import cn from 'classnames'
import { Image } from 'react-datocms'
import PublishDate from '../PublishDate'
import { useEffect, useState } from 'react'
import { useStore } from '@lib/store'
import AudioPlayer from '../AudioPlayer'

export type LayoutProps = {
  data: ImageRecord
}

export default function ImagePost({ data: { id, image, audio, textToVoice, background, colorBackground, _firstPublishedAt } }: LayoutProps) {

  const [expanded] = useStore(state => [state.expanded])
  const [open, setOpen] = useState(true)

  useEffect(() => {
    setOpen(expanded)
  }, [expanded])

  return (
    <section
      id={id}
      key={id}
      className={cn(s.image, open && s.open)}
      style={{ backgroundColor: background?.hex }}
      onClick={() => !expanded && setOpen(!open)}
    >
      {image.responsiveImage &&
        <figure>
          <Image data={image.responsiveImage} />
        </figure>
      }
      {audio && <AudioPlayer audio={audio} />}
      <PublishDate date={_firstPublishedAt} />
    </section>
  );
}