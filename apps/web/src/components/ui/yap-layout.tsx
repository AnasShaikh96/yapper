import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'

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
                {yapArray.map(item => <TabsTrigger key={item.id} value={item.value}>{item.title}</TabsTrigger>)}
            </TabsList>
            {yapArray.map(item => <TabsContent key={item.id} value={item.value}>{item.content}</TabsContent>)}
        </Tabs>

    )
}

export default YapLayout