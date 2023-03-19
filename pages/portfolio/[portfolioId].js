import { useRouter } from 'next/router'

export default function PortfolioId() {

    const router = useRouter()

    const query = router.query

    console.log(router.pathname)
    console.log(query)

    return (
        <div>
            <h1>PortfolioId</h1>
            <p>You are looking for: { query.portfolioId }</p>
        </div>
    )
}