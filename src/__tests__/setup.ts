import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './mocks/server'

// MSW server'ı başlat
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// Her test sonrası handler'ları sıfırla
afterEach(() => server.resetHandlers())

// Tüm testler bittikten sonra server'ı kapat
afterAll(() => server.close())
