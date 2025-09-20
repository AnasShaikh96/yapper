'use client'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'
import { Button } from './button'
import { Plus, X } from 'lucide-react'
import YapDocComponent from './yap-doc'
import { YapObject } from '@/lib/type'
import { initialEditorValue } from '@/lib/constants'




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

    const [yapData, setYapData] = useState<YapObject[]>([])
    const [selectedYap, setSelectedYap] = useState<YapObject>()

    console.log("yapData", yapData, selectedYap)


    const handleClick = () => {
        setYapData([...yapData, {
            id: yapData.length,
            title: `Untitled ${yapData.length}`,
            value: `${yapData.length}`,
            content: initialEditorValue
        }])
    }

    return (
        <Tabs defaultValue={yapData[0]?.value ?? null} className="w-full">
            <TabsList className='rounded-none'>
                {yapData.map(item => <TabsTrigger key={item.id} value={item.value} onClick={() => setSelectedYap(item)}>
                    {item.title}


                </TabsTrigger>)}

                <Button variant={'ghost'} size={'icon'}
                    onClick={() => handleClick()}
                ><Plus className="h-5 w-5" />
                </Button>
            </TabsList>



            {selectedYap &&
                <TabsContent key={selectedYap.id} value={selectedYap.value}>
                    <YapDocComponent content={selectedYap} setYapData={setYapData} yapData={yapData} />
                </TabsContent>
            }
            {/* {yapData.map(item => (
                <TabsContent key={item.id} value={item.value}>
                    <YapDocComponent content={item} setYapData={setYapData} />
                </TabsContent>
            )
            )} */}
        </Tabs>

    )
}

export default YapLayout