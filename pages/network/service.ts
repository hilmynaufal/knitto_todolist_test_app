import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { Todo } from '../types/Todo';


export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com/'
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    tagTypes: ['Todo'],
    endpoints: (builder) => ({
        getTodoList: builder.query<Todo[], number>({
            query: (page) => `todos?_start=${page * 10}&_limit=10`,
            providesTags: ['Todo']
        }),
        addTodo: builder.mutation<Todo, Todo>({
            query: (body) => ({
                url: '/todos',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Todo']
        })
    })
})

export const { useGetTodoListQuery } = todoApi;
export const { useAddTodoMutation } = todoApi;
export const { util: { getRunningQueriesThunk } } = todoApi;