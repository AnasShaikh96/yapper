import NotesCard from '@/components/shared/notes-card'
import { Button } from '@/components/ui/button'
import { tempArr } from '@/lib/constants'
import { ExternalLinkIcon, EyeIcon } from 'lucide-react'
import React from 'react'

const Page = () => {
  return (
    <div className="column-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 mx-8 mt-3 hover:cursor-pointer">
      {tempArr.map(item => (
        <div key={item} className='group relative break-inside-avoid'>
          <Button variant={'ghost'} size={'icon'} className='hidden absolute right-1 top-1 group-hover:block'><ExternalLinkIcon /></Button>
          <Button variant={'secondary'} size={'icon'} className='hidden absolute inset-[50%] translate-x-[-50%] translate-y-[-50%] w-32 group-hover:flex items-center justify-center'>
            Open here <EyeIcon />
          </Button>
          <NotesCard item={item} className={"group-hover:blur-md"} />
        </div>
      ))}
    </div>
  )
}

export default Page