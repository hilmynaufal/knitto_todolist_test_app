import { getRunningQueriesThunk, todoApi, useAddTodoMutation, useGetTodoListQuery } from './network/service'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { useState } from 'react';

import { Todo } from './types/Todo';
import { wrapper } from './network/store';

export default function Home({ data }: { data?: Todo[] }) {

  const [page, setPage] = useState(0)
  const getQueryResult = useGetTodoListQuery(page)
  data = getQueryResult.data
  //form
  const [newTodoForm, setNewTodoFrom] = useState(false)
  //addNewTodo
  const [newTodoTitle, setNewTodoTitle] = useState("")
  const [addNewTodo, postResult] = useAddTodoMutation()
  console.log(postResult)

  function previousPage() {
    if (page > 0) {
      setPage(page - 1)
    }
  }

  function nextPage() {
    setPage(page + 1)
  }

  return (
    <div className='bg-slate-400 flex w-screen min-h-screen justify-center flex-col items-center'>
      <h1 className='font-semibold text-4xl flex-none p-4 sm:text-center underline'>
        Todo List
      </h1>
      {
        newTodoForm ? 
        <div className='flex flex-row w-2/6S'>
          <input className='p-2 text-black outline-none flex-1' onChange={(e) => setNewTodoTitle(e.target.value)}/>
          <button className='border border-solid border-white hover:border-2 p-2' onClick={() => addNewTodo({
            userId: 0,
            id: 0,
            title: newTodoTitle,
            completed: false
          })}>Create new Todo</button>
          <button className='ml-8' onClick={() => setNewTodoFrom(false)}>Cancel</button>
        </div>
         : <div className='hover:cursor-pointer hover:border-2 border border-white text-black w-2/6 p-2'
        onClick={() => setNewTodoFrom(true)}>
        <p className='text-center text-xl font-medium text-white'>NEW TODO</p>
      </div>  
      }

      <div className='flex flex-col m-4 items-center'>
        <div className='bg-white border rounded-md flex flex-col divide-y-2 p-4'>
          {data === undefined ? null : data.map((e, i) =>
            <div className='flex flex-row py-2 gap-2 items-center' key={i}>
              <p className='text-black text-xs text-center' >{e.id}</p>
              <p className='text-black' >{e.title}</p>
              <p className='text-black' >{e.completed}</p>
            </div>
          )}
          {/* {
            data === undefined ? null : <div className='flex flex-row py-2 gap-2 items-center'>
            <p className='text-black text-xs text-center' >{data.id}</p>
            <p className='text-black' >{data.title}</p>
            <p className='text-black' >{data.completed}</p>
          </div>
          } */}
        </div>
        <div className='flex flex-row items-center justify-center gap-8 '>
          <AiOutlineArrowLeft className='hover:cursor-pointer' onClick={previousPage} />
          <p>{page + 1}</p>
          <AiOutlineArrowRight className='hover:cursor-pointer' onClick={nextPage} />
        </div>
      </div>

    </div>
  )
}

//ISR menggunakan next-redux-wrapper
export const getStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    store.dispatch(todoApi.endpoints.getTodoList.initiate(0))
    const result = await Promise.all(store.dispatch(getRunningQueriesThunk()))
    const data = result[0].data
    return {
      props: { data },
      revalidate: 10
    }
  }
)