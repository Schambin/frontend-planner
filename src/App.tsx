import { MapPin, Calendar, ArrowRight, UserPlus2, Settings2, X, AtSign, Plus } from "lucide-react"
import { FormEvent, useState } from "react"

export function App() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  
  function openGuestsInput() {
    setIsGuestsInputOpen(true)
  }

  function closeGuestsInput(){ 
    setIsGuestsInputOpen(false)
  }

  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)

  function openGuestsModal() {
    setIsGuestsModalOpen(true)
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false)
  }

  const [emailsToInvite, setEmailsToInvite] = useState([])

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    let data = new FormData(event.currentTarget)
    const email = data.get('email') as string

    if(!email || email.trim() === ''){
      return
    }

    setEmailsToInvite([
      ...emailsToInvite,
      email
    ])
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
    
      <div className="max-w-3xl w-full px-6 text-center space-y-10 shadow-shape">

        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3">
      
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="text-zinc-400 size-5"/>
              <input
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 w-full"
                disabled={isGuestsInputOpen}
                type="text"
                placeholder="Para onde você vai ?"
              />
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="text-zinc-400 size-5"/>
              <input
                className="bg-transparent text-lg placeholder-zinc-400 w-24 outline-none"
                disabled={isGuestsInputOpen}
                type="text"
                name=""
                id=""
                placeholder="Quando ?"
              />
            </div>

            <div className="w-px h-6 bg-zinc-800" />

            {isGuestsInputOpen ? (
              <button 
                onClick={closeGuestsInput}
                className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-600"
              >
                Alterar local/data
                <Settings2/>
              </button>
              ) : 
              <button 
                onClick={openGuestsInput}
                className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
              >
                Continuar 
                <ArrowRight />
              </button>
            }
            
          </div>

          {isGuestsInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3">
      
              <div className="flex items-center gap-2 flex-1">
                <UserPlus2 className="text-zinc-400 size-5"/>
                <button type="button" onClick={openGuestsModal}>
                  <span className="text-lg text-zinc-400 outline-none flex-1 w-full">
                    Quem estará na viagem ?
                  </span>
                </button>
              </div>

              <button className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                Confirmar viagem
                <ArrowRight />
              </button>
            </div>
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
        </p>
      
      </div>

      {isGuestsModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-white ">Selecionar Convidados</h2>
                    <button onClick={closeGuestsModal} type="button">
                      <X className="size-5 text-zinc-400"/>
                    </button>
                </div>
                <p className="text-sm text-zinc-400">
                  Os convidados irão receber e-mails para confirmar a participação na viagem.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {emailsToInvite.map( email => {
                  return (
                    <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                      <span className="text-zinc-300">{email}</span>
                      <button type="button">
                        <X className="size-4 text-zinc-400"/>
                      </button>
                    </div>
                    )
                })}
              </div>

              <div className="w-full h-px bg-zinc-800">
              </div>

              <form onSubmit={addNewEmailToInvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex gap-3 items-center">
                  <div className="px-2 flex flex-1 items-center gap-2">
                    <AtSign className="text-zinc-400 size-5"/>
                    <input
                      type="email"
                      name="email"
                      placeholder="Digite o e-mail do convidado"
                      className="bg-transparent placeholder:text-zinc-400 outline-none flex-1"
                    />
                  </div>
                  <button 
                    className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400" 
                    type="submit"
                  >
                    Convidar<Plus/>
                  </button>
              </form>
          </div>
        </div>
      )}
    </div>
  )
}