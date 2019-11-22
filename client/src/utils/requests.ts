const request = (
  method: string,
  endpoint: string,
  payload: object,
  authorization: string,
): Promise<{}> => {
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

export const get = (endpoint: string, authorization: string = null): Promise<{}> => request('GET', endpoint, null, authorization)

export const patch = (
  endpoint: string,
  payload: object,
  authorization: string = null,
): Promise<{}> => request('PATCH', endpoint, payload, authorization)

export const post = (
  endpoint: string,
  payload: object,
  authorization: string = null,
): Promise<{}> => request('POST', endpoint, payload, authorization)

export const put = (
  endpoint: string,
  payload: object,
  authorization: string = null,
): Promise<{}> => request('PUT', endpoint, payload, authorization)

export const del = (endpoint: string, authorization: string = null): Promise<{}> => request('DELETE', endpoint, null, authorization)
