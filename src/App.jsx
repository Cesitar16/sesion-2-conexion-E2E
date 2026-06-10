import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

const DOG_API_URL = 'https://dog.ceo/api/breeds/image/random'

function formatBreedName(imageUrl) {
  const breedMatch = imageUrl.match(/breeds\/([^/]+)\//)

  if (!breedMatch) {
    return 'Raza no identificada'
  }

  const breedTokens = breedMatch[1].split('-').filter(Boolean)
  const orderedTokens =
    breedTokens.length > 1
      ? [...breedTokens.slice(1), breedTokens[0]]
      : breedTokens

  return orderedTokens
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ')
}

function formatRefreshTime(date) {
  return date.toLocaleTimeString('es-CL', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

async function requestRandomDog(signal) {
  const response = await fetch(DOG_API_URL, { signal })

  if (!response.ok) {
    throw new Error('Dog API request failed')
  }

  const data = await response.json()

  if (data.status !== 'success' || typeof data.message !== 'string') {
    throw new Error('Dog API response was not valid')
  }

  return data.message
}

function App() {
  const requestControllerRef = useRef(null)
  const [dogImageUrl, setDogImageUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [imageReady, setImageReady] = useState(false)
  const [lastUpdated, setLastUpdated] = useState('')

  const loadRandomDog = useCallback(async () => {
    requestControllerRef.current?.abort()

    const controller = new AbortController()
    requestControllerRef.current = controller

    setLoading(true)
    setError('')
    setImageReady(false)

    try {
      const nextDogImageUrl = await requestRandomDog(controller.signal)

      if (controller.signal.aborted) {
        return
      }

      setDogImageUrl(nextDogImageUrl)
      setLastUpdated(formatRefreshTime(new Date()))
    } catch (fetchError) {
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return
      }

      setError('No pude cargar una imagen en este momento. Intenta nuevamente.')
    } finally {
      if (requestControllerRef.current === controller) {
        requestControllerRef.current = null
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    requestControllerRef.current = controller

    const loadInitialDog = async () => {
      try {
        const nextDogImageUrl = await requestRandomDog(controller.signal)

        if (controller.signal.aborted) {
          return
        }

        setDogImageUrl(nextDogImageUrl)
        setLastUpdated(formatRefreshTime(new Date()))
      } catch (fetchError) {
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          return
        }

        setError('No pude cargar una imagen en este momento. Intenta nuevamente.')
      } finally {
        if (requestControllerRef.current === controller) {
          requestControllerRef.current = null
          setLoading(false)
        }
      }
    }

    loadInitialDog()

    return () => {
      controller.abort()

      if (requestControllerRef.current === controller) {
        requestControllerRef.current = null
      }
    }
  }, [])

  const breedName = dogImageUrl ? formatBreedName(dogImageUrl) : 'Esperando foto'

  return (
    <main className="app-shell">
      <section className="dog-card">
        <p className="eyebrow">Consumo simple de API</p>
        <h1>Perros aleatorios, un clic a la vez.</h1>
        <p className="lede">
          Esta pagina consulta <code>{DOG_API_URL}</code> y trae una imagen
          distinta cada vez que presionas el boton.
        </p>

        <div className="actions">
          <button
            type="button"
            className="fetch-button"
            onClick={loadRandomDog}
            disabled={loading}
          >
            {loading ? 'Buscando perro...' : 'Traer otro perro'}
          </button>

          <p className="status-pill" aria-live="polite">
            {loading ? 'Consultando la API' : `Raza: ${breedName}`}
          </p>
        </div>

        {error ? (
          <p className="error-banner" role="alert">
            {error}
          </p>
        ) : null}

        <div className="photo-frame">
          {dogImageUrl ? (
            <img
              src={dogImageUrl}
              alt={`Perro aleatorio ${breedName}`}
              className={`dog-photo${imageReady ? ' is-visible' : ''}`}
              onLoad={() => setImageReady(true)}
            />
          ) : !loading ? (
            <div className="empty-state">Todavia no hay imagen disponible.</div>
          ) : null}

          {loading ? (
            <div className="status-overlay">
              {dogImageUrl
                ? 'Cargando una nueva foto...'
                : 'Buscando la primera foto...'}
            </div>
          ) : null}
        </div>

        <div className="meta-grid">
          <article className="meta-card">
            <span>Raza detectada</span>
            <strong>{breedName}</strong>
          </article>

          <article className="meta-card">
            <span>Ultima actualizacion</span>
            <strong>{lastUpdated || 'Se carga al abrir la pagina'}</strong>
          </article>
        </div>

        <a
          className="image-link"
          href={dogImageUrl || '#'}
          target="_blank"
          rel="noreferrer"
          aria-disabled={!dogImageUrl}
          onClick={(event) => {
            if (!dogImageUrl) {
              event.preventDefault()
            }
          }}
        >
          Abrir imagen original
        </a>
      </section>
    </main>
  )
}

export default App
