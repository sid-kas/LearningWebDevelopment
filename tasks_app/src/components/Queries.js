import { gql, useQuery } from '@apollo/client';

const GET_TASKS = gql`
    query GetTasksData {
        tasks(order_by: {updated_at: desc}) {
            id
            updated_at
            title
            checked
        }
    }
`;

const INSERT_TASK = gql`
    mutation ($title: String!, $checked: Boolean! ) {
        insert_tasks_one(object: {title: $title, checked: $checked}) {
            id
            created_at
            updated_at
            title
            checked
        }
    }
`;

const CHECK_TASK = gql`
    mutation ($id:Int!, $checked: Boolean!) {
        update_tasks_by_pk(pk_columns: {id: $id}, _set: {checked: $checked}) {
            updated_at
            checked
        }
    }
    
`;

const EDIT_TASK = gql`
    mutation ($id:Int!, $title: String!) {
        update_tasks_by_pk(pk_columns: {id: $id}, _set: {title: $title}) {
            updated_at
            title
        }
    }
    
`;

const DELETE_TASK = gql`
    mutation ($id: Int!) {
        delete_tasks_by_pk(id: $id) {
            id
        }
    }
`;


export {
    GET_TASKS,
    INSERT_TASK,
    CHECK_TASK,
    EDIT_TASK,
    DELETE_TASK
}