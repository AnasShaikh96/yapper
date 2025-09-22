'use client'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import YapDocComponent from './yap-doc'
import { YapObject } from '@/lib/type'
import { initialEditorValue } from '@/lib/constants'




const YapLayout = () => {

    const [yapData, setYapData] = useState<YapObject[]>([])
    const [selectedYap, setSelectedYap] = useState<YapObject>()

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
        </Tabs>

    )
}

export default YapLayout