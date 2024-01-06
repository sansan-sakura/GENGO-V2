import { Hanko } from "../ui/generic/Hanko"
import { ContentFrame } from "../ui/layoutParts/ContentFrame"
import { aboutText } from "../statics/texts";

export const AboutPage = () => {
  return (
    <section>
    <div>
    <ContentFrame>
      <Hanko />
      <div className="mt-6 sm:mt-8 text-sm leading-6 sm:text-base sm:leading-7">
        {aboutText.en.text}
      </div>
      <div className="flex justify-end w-full">
        <Hanko src="/sakura.webp" size="sm" />
      </div>
    </ContentFrame>
  </div>
</section>
  )
}
