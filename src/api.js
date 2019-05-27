import { NotFoundError } from 'navi'
import axios from 'axios'

export const fetchOrganization = async id => {
  const req = await axios(`https://api.brigada.mx/api/organizations/${id}/`)
  if (!req || req.status !== 200 || !req.data) {
    throw new NotFoundError()
  }
  return req.data
}

export const fetchOrganizations = async () => {
  const req = await axios(`https://api.brigada.mx/api/organizations/?page_size=1&offset=0`)
  if (!req || req.status !== 200 || !req.data) {
    throw new NotFoundError()
  }

  const ids = req.data.results.map(org => org.id)
  const orgs = await Promise.all(ids.map(async id => fetchOrganization(id)))
  return orgs
}
