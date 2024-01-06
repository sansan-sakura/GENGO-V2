import { Hanko } from "../ui/generic/Hanko"
import { ContentFrame } from "../ui/layoutParts/ContentFrame"
import { welcomeText as text } from "../statics/texts";
import { ButtonOutline } from "../ui/buttons/ButtonOutline";


export const IndexPage = () => {
  return (
    <section className="min-h-screen overflow-y-hidden">
      {/* <div className=" my-12 md:my-16">
        <Hanko />
      </div> */}
      <div className="min-w-80 w-[90%] max-w-[600px] bg-amber-50 rounded-lg mx-auto mt-[300px]">
        <ContentFrame>
          <div className="px-10 pb-6">
          <h2 className="font-display text-4xl mb-4 md:text-5xl md:mb-8 leading-[50px] text-center">Welcome to GENGO <span className="text-2xl md:text-3xl">📕</span></h2>
          <p className="text-base mb-4 leading-7 md:text-xl tracking-widest mb:mb-8 md:leading-9">
            {text.en.text}
          </p>
          <ButtonOutline type="link" path="/login" defaultBg="bg-blue-dark" bg="bg-blue-dark" textColor="text-amber-100" borderColor="border-amber-100" name="start"/>
          </div>
        </ContentFrame>
      </div>
    </section>
  )
}
