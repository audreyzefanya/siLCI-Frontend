import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PiListLight } from 'react-icons/pi';

const RankingBiller = ({
    dataDragNDrop = [
        {
            id:"1",
            name: 'Repalm Company',
            email: 'nathan.roberts@example.com',
            picture: "https://picsum.photos/200"
        },
        {
            id:"2",
            name: 'Imagine Sdn Bhd',
            email: 'michelle.rivera@example.com',
            picture: "https://picsum.photos/200"
        },
        {
            id:"3",
            name: 'Le Apple Bakery and Bakery Mart',
            email: 'sara.cruz@example.com',
            picture: "https://picsum.photos/200"
        },
        {
            id:"4",
            name: 'Thryffy Technologies',
            email: 'michael.mitc@example.com',
            picture: "https://picsum.photos/200"
        },
    ],
    isEdited = false,
    onChangeData,
}) => {

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(dataDragNDrop);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        onChangeData(items)
    }

  return (
    <div className='rounded-md shadow max-h-96 overflow-y-auto'>
        <div className='flex'>
            <div className='w-24 bg-neutral30 rounded-tl-md'>
                <div className='h-12 flex items-center justify-center'>
                    <p className='text-neutral300 font-semibold text-sm text-center'>RANK</p>
                </div>
    
                <div className='py-2 bg-neutral10 rounded-bl-md'>
                    {
                        dataDragNDrop.map((value, index) => 
                            <div className='bg-neutral10 flex justify-center h-16 items-center'>
                                <div className='flex items-center justify-center w-6 h-6 bg-neutral40 rounded-full'>
                                    <p className='text-xs text-black'>{index + 1}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div>
                <div className='h-12 w-96 bg-neutral30 w-full flex items-center justify-start rounded-tr-md'>
                    <p className='text-neutral300 font-semibold text-sm text-start'>BILLER</p>
                </div>
                <div className='py-2 bg-neutral10 rounded-br-md'>
                    {
                        isEdited ?
                            <DragDropContext onDragEnd={handleOnDragEnd}>
                                <Droppable droppableId="characters">
                                    {(provided) => (
                                        <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                                            {dataDragNDrop.map((value, index) => {
                                                return (
                                                    <Draggable key={value.id} draggableId={value.id} index={index}>
                                                        {(provided) => (
                                                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                <div className='bg-neutral10 w-96 flex justify-center h-16 items-center' key={index}>
                                                                    <div className='mr-2 p-3 w-full flex items-center border border-neutral40 rounded-md'>
                                                                        <PiListLight size={12} className='text-black mr-2' />
                                                                        <img src={value.picture} className='w-8 h-8 rounded-full' />
                                                                        <div className='ml-2'>
                                                                            <p className='font-semibold text-sm text-black'>{value.name}</p>
                                                                            <p className='font-normal text-xs text-neutral80'>{value.email}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )}
                                                    </Draggable>
                                                );
                                            })}
                                            {provided.placeholder}
                                        </ul>
                                    )}
                                </Droppable>
                            </DragDropContext>
                            :
                            <div>
                                {
                                    dataDragNDrop.map((value, index) => 
                                        <div className='bg-neutral10 w-96 flex justify-center h-16 items-center' key={index}>
                                            <div className='mr-2 p-3 w-full flex items-center border border-neutral40 rounded-md'>
                                                <img src={value.picture} className='w-8 h-8 rounded-full' />
                                                <div className='ml-2'>
                                                    <p className='font-semibold text-sm text-black'>{value.name}</p>
                                                    <p className='font-normal text-xs text-neutral80'>{value.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    </div>
  );
}

export default RankingBiller;