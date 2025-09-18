import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'
import { Button } from './button'
import { X } from 'lucide-react'

const YapLayout = () => {
    const yapArray = [
        {
            id: 1,
            value: 'xyz',
            title: 'Xyz',
            content: 'lorem ipsum'
        },
        {
            id: 2,
            value: 'abc',
            title: 'Abc',
            content: 'flower lorem ipsum'
        },
        {
            id: 3,
            value: 'jfk',
            title: 'Jfk',
            content: 'Some value that starts with jfk'
        }
    ]

    return (
        <Tabs defaultValue={yapArray[0].value} className="w-full">
            <TabsList className='rounded-none'>
                {yapArray.map(item => <TabsTrigger key={item.id} value={item.value}>
                    {item.title}

                    <Button variant={'ghost'} size={'icon'} ><X className="h-5 w-5" />
                    </Button>
                </TabsTrigger>)}
            </TabsList>
            {yapArray.map(item => <TabsContent key={item.id} value={item.value}>{item.content}</TabsContent>)}
        </Tabs>

    )
}

export default YapLayout