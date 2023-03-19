import Link from "next/link";

export default function ClientProject() {

    const clients = [
        { id: 'sun', name: 'Our Sun' },
        { id: 'moon', name: 'Our Moon' }
    ]

    return (
        <div>
            <h1>Client Page</h1>
            <ul>
                { clients.map((client)=>(
                    <li key={client.id}>
                        <Link href={{
                            pathname: '/clients/[id]',
                            query: { id: client.id }
                        }}>{client.name}</Link>
                    </li>
                )) }
            </ul>
        </div>
    )
}