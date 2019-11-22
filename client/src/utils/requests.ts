const request = async (
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

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, opts)

    if (res.status >= 400) {
      const json = await res.json()
      return Promise.reject(json)
    }

    const json = await res.json()
    return res.ok ? Promise.resolve(json) : Promise.reject(json)
  } catch (err) {
    throw new Error(err.message)
  }
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
