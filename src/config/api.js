const BASE_URL = process.env.REACT_APP_API_BASE_URL

//USER
export const LOGIN_URL = BASE_URL + 'login' //POST
export const GET_USERS_URL = BASE_URL + 'team?product=outreach&company_id=' //GET

//TASK MANAGEMENT
export const ALL_TASKS_URL = BASE_URL + 'task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id='

export const SINGLE_TASK_URL = BASE_URL + 'task/lead_465c14d0e99e4972b6b21ffecf3dd691/'