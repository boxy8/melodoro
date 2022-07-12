import { getProviders, signIn } from "next-auth/react"

function Login({ providers }) {
    return (
        <div>
            <h1>Welcome</h1>
            
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button onClick={() => signIn(provider.id, { callbackUrl: "/" }
                        )}
                    >
                        Login with {provider.name}
                    </button>
                </div>
            ))
            }

            
        </div>
    )
}

// This gets called on every request
export async function getServerSideProps() {
    // const providers = await getProviders()
  
    // Pass data to the page via props
    // return { props: { providers }}
    return { props: { providers: {} } }
  }
  
  export default Login



