import { wheelTweenings } from "../../../config";
import { backout, backout_2, tweenTo } from "../../../utils/utils";
const bootingTime = 2000
export function animateWheelTweenings() {
  if (wheelTweenings.length === 0) return
  const wheelTweening = wheelTweenings[0]
  const phase = (Date.now() - wheelTweening.startTime) / bootingTime
  const angle = wheelTweening.wheel.angle + backout(1)(phase) * 20
  if (phase >= 1 && wheelTweening.shouldEnd && angle >= 360) {
    tweenTo(wheelTweening.wheel, "angle", 0, wheelTweening.targetAngle, wheelTweening.targetAngle * 3, backout_2(0.8), null, wheelTweening.onComplete)
    wheelTweenings.splice(0)
  }
  wheelTweening.wheel.angle = angle % 360
}
