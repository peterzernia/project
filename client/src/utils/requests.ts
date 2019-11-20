function request<T>(
  method: string,
  endpoint: string,
  payload: object,
  authorization: string,
): Promise<T> {
  const opts = {
    headers: {
      Authorization: authorization,
    },
    body: null,
    method,
  }

  if (payload) {
    opts.headers['Content-Type'] = 'application/json'
    opts.body = JSON.stringify(payload)
  }

  return fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, opts)
    .then((res) => {
      if (res.status >= 400) {
        res.json().then((json) => {
          Promise.reject(json)
        })
      }

      if (!res) return null
      return res.json().then((json) => (res.ok ? json : Promise.reject(json)))
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export function get<T>(endpoint: string, authorization: string = null): Promise<T> {
  return request('GET', endpoint, null, authorization)
}

export function patch<T>(
  endpoint: string,
  payload: object,
  authorization: string = null,
): Promise<T> {
  return request('PATCH', endpoint, payload, authorization)
}

export function post<T>(
  endpoint: string,
  payload: object,
  authorization: string = null,
): Promise<T> {
  return request('POST', endpoint, payload, authorization)
}

export function put<T>(
  endpoint: string,
  payload: object,
  authorization: string = null,
): Promise<T> {
  return request('PUT', endpoint, payload, authorization)
}

export function del<T>(endpoint: string, authorization: string = null): Promise<T> {
  return request('DELETE', endpoint, null, authorization)
}
