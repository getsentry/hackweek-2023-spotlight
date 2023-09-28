// import { useSentryTraces } from "~/lib/useSentryTraces";
import { useSentryEvents } from "../lib/useSentryEvents";

export default function Trigger({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}) {
  const events = useSentryEvents();
  // const traces = useSentryTraces();

  const errorCount = events.filter((e) => "exception" in e).length;
  // const traceCount = traces.length;

  return (
    <div
      className="sentry-trigger"
      style={{
        display: isOpen ? "none" : undefined,
      }}
      onClick={() => setOpen(!isOpen)}
    >
      {errorCount === 0 ? <Huston height={80} width={80} /> : <HustonError height={62} width={80} />}
      {errorCount > 0 ? <span
        className={
          errorCount === 0
            ? "bg-indigo-300 text-indigo-600"
            : "bg-red-500 text-white"
        }
      >
        {errorCount}
      </span> : null}
    </div>
  );
}

const Huston = (props: {width: number, height:number}) => (
  // wrap the svg in a div that scales the size with height and width props
  <div style={{height: props.height, width: props.width}}>    
      

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 20 174 170" width={174} height={170} style={{height: props.height*1.3, width: props.width}}>
  <path
    fill="#16181D"
    d="M0 40.91V0h174.02v170.859H0V40.91Zm167.24 80.24c-.019 2.406.047 4.845-.397 7.22-.654 3.491-2.588 6.736-5.144 9.211-1.69 1.638-3.842 2.997-6.04 3.884-.953.386-1.953.603-2.906.982-3.424.502-6.933.389-10.385.392l-13.375-.006-50.304-.006-15.912.003c-2.5 0-5.188-.19-7.667.027l-.133.022c-1.723.268-3.518.05-5.256.235l9.391.063c-1.04.305-2.15-.221-3.162.364l-.116-.03c-.437-.109-.732-.1-1.177-.025l-.059.304.208.254-.023.098c-.074.35-.064.591.017.938-.429 1.041-1.33.919-1.443 2.245.338.307 1.066.203 1.092.566.014.193-.074.389-.14.567.28.163.52.298.838.376-.118.093-.295.277-.426.334-.427.185-4.146 0-4.843 0v.087l13.995.049.132.172c-1.43.193-3.136.027-4.598.027l-10.236.002-17.245.003c-4.112.002-8.244.125-12.34-.271-1.796-.174-3.895-.732-5.538-1.47-5.457-2.455-10.18-6.713-12.382-12.299-.705-1.787-.99-3.752-1.666-5.549v40.94h174.02v-46.62c-.18.193-.296.395-.424.623-.55-.171-.858.012-1.408.025-.853.021-1.94-.212-2.727.116l-.092.04c-.35-.123-.612-.194-.987-.162l-.09.01c-.192-.156-.391-.238-.616-.333-.304-.89.29-1.518.086-2.3-.195-.753-.202-1.649-.29-2.43l-.232 1.323ZM0 40.91c.491-.777.657-2.29.936-3.207C2.172 33.637 4.17 30.39 7.29 27.446c3.031-2.861 6.965-4.79 11.052-5.674 2.555-.553 5.243-.44 7.846-.444l9.453-.006 28.35.04-.14.028c-1.368.258-2.86.169-4.253.212-.408.013-.752.142-1.14.17-2.237.167-4.628.007-6.88.005-1.697-.002-3.433-.088-5.1.133-.605.08-.763-.062-1.366.245.486.553 1.046.28 1.233 1.2.079.387.24.663.585.876l.565.307c.123.306.143.475.068.797.208.209.41.398.573.643.228.34.977.486 1.328.841l.326-.039.106.346-.123.037c-.086.027-.168.066-.253.096-.146.053-.233.02-.383.002-.37-.043-.63.077-.96.215l.085.14c2.858-.005 5.847-.172 8.667.202.941.125 1.845-.02 2.799.194l64.423.032h17.792c3.245.004 6.735-.244 9.936.238 3.046.458 5.915 1.928 8.37 3.693-.188-.513-.44-.685-.845-1.022-.841-.7-2.225-1.391-3.25-1.78l-.574-.222c-.184-.073-.328-.132-.532-.107-.24.03-.46-.2-.658-.34-.295-.028-.533-.148-.804-.182-.156-.02-.27-.015-.412-.094-.514-.283-1.137-.544-1.743-.467l-.1.022-.184-.116.27-.274.175-.026c.413-.075.653-.249.892-.58-.163-.374-.449-.949-.906-1.06-.275-.067-.412.027-.747-.109l.02-.927-.455-.33c-.077-.447-.233-.867-.38-1.295l-1.31-.288-.094-.14c1.15-.007 2.2-.626 3.305-.418l.098.02c.127-.123.193-.182.238-.358l.023-.122c.483-.037 1.071-.157 1.528.026.57.229 1.13.111 1.69.282.241.074.472.153.724.188 1.948.27 4.685 1.351 6.285 2.492 1.015.723 2.424 1.357 3.258 2.26.113.121.406.106.576.127 1.263.88 2.313 2.234 3.179 3.479.66.95 1.41 1.893 1.939 2.921 1.201 2.336 1.826 4.903 2.564 7.402V0H0v40.91Z"
  />
  <path
    fill="#fff"
    d="M71.99 98.766h5.836c.176 1.828.562 3.555 1.725 5.049 1.388 1.781 3.51 3.116 5.791 3.389 2.433.29 4.617-.315 6.538-1.784 2.325-1.779 2.969-3.808 3.312-6.592.543-.16 1.243-.07 1.816-.069l3.995.017c-.06 1.666-.31 3.053-.797 4.647-.536 1.412-1.244 2.767-2.17 3.971-2.316 3.014-5.889 4.963-9.684 5.466-3.605.478-7.531-.497-10.435-2.675-2.206-1.655-4.146-3.967-5.006-6.588-.515-1.57-.694-3.202-.921-4.831ZM131.462 84.653l.075-.022c3.423-.422 7.169.83 9.904 2.802 2.946 2.125 5.124 5.74 5.633 9.297.537 3.758-.495 7.622-2.825 10.634-2.552 3.298-6.058 5-10.19 5.542l-.07.011c-3.263.405-7.142-.74-9.763-2.672-3.238-2.387-5.2-5.654-5.755-9.578-.535-3.77.507-7.518 2.853-10.549 2.539-3.28 6.058-4.922 10.138-5.465ZM39.024 84.654l.113-.027c3.428-.439 7.197.89 9.933 2.854 2.934 2.105 5.046 5.761 5.558 9.278.532 3.666-.462 7.57-2.747 10.52-2.624 3.388-6.116 5.06-10.337 5.63-3.235.38-6.967-.626-9.576-2.549-3.315-2.442-5.342-5.56-5.907-9.6-.52-3.715.341-7.456 2.681-10.475 2.612-3.37 6.074-5.057 10.282-5.63Z"
  />
  <path
    fill="#8F58F2"
    d="M160.25 31.975c-.188-.513-.44-.685-.845-1.022-.841-.7-2.225-1.391-3.25-1.78l-.574-.222c-.184-.073-.328-.132-.532-.107-.24.03-.46-.2-.658-.34-.295-.028-.533-.148-.804-.182-.156-.02-.27-.015-.412-.094-.514-.283-1.137-.544-1.743-.467l-.1.022-.184-.116.27-.274.175-.026c.413-.075.653-.249.892-.58-.163-.374-.449-.949-.906-1.06-.275-.067-.412.027-.747-.109l.02-.927-.455-.33c-.077-.447-.233-.867-.38-1.295l-1.31-.288-.094-.14c1.15-.007 2.2-.626 3.305-.418l.098.02c.127-.123.193-.182.238-.358l.023-.122c.483-.037 1.071-.157 1.528.026.57.229 1.13.111 1.69.282.241.074.472.153.724.188 1.948.27 4.685 1.351 6.285 2.492 1.015.723 2.424 1.357 3.258 2.26.113.121.406.106.576.127 1.263.88 2.313 2.234 3.179 3.479.66.95 1.41 1.893 1.939 2.921 1.201 2.336 1.826 4.903 2.564 7.402v83.302c-.18.193-.296.395-.424.623-.55-.171-.858.012-1.408.025-.853.021-1.94-.212-2.727.116l-.092.04c-.35-.123-.612-.194-.987-.162l-.09.01c-.192-.156-.391-.238-.616-.333-.304-.89.29-1.518.086-2.3-.195-.753-.202-1.649-.29-2.43l-.232 1.323-.033-75.453c-.191-5.641-2.858-9.96-6.957-13.723Z"
  />
  <defs>
    <linearGradient
      id="a"
      x1={45.92}
      x2={29.451}
      y1={226.19}
      y2={32.504}
      gradientUnits="userSpaceOnUse"
    >
      <stop offset={0} stopColor="#47E7C9" />
      <stop offset={1} stopColor="#386AF5" />
    </linearGradient>
  </defs>
  <path
    fill="url(#a)"
    d="M0 61.295c.723-1.163.966-3.43 1.377-4.805 1.819-6.091 4.76-10.957 9.348-15.368 4.46-4.286 10.247-7.175 16.26-8.5 3.758-.83 7.712-.661 11.54-.666l13.908-.009 41.706.06-.205.042c-2.014.386-4.207.253-6.258.318-.6.019-1.107.212-1.676.255-3.291.25-6.81.01-10.123.006-2.496-.002-5.05-.132-7.502.2-.89.12-1.122-.094-2.009.368.715.827 1.539.418 1.814 1.797.115.58.353.993.86 1.312l.831.46c.182.459.211.712.1 1.194.307.313.603.597.844.964.334.51 1.437.729 1.953 1.26l.48-.058.155.519-.18.055c-.127.04-.247.098-.372.143-.216.08-.344.03-.564.004-.543-.065-.926.114-1.412.321l.125.21c4.204-.007 8.6-.258 12.75.303 1.384.188 2.714-.03 4.117.29l-33.796.007-12.846-.006c-3.417.026-6.921.006-10.267.79-4.917 1.151-9.709 3.865-13.231 7.48-3.585 3.676-6.288 8.791-7.187 13.87-.92 5.2-.57 10.906-.578 16.18l.013 25.214.027 80.226c.115 7.801 2.457 14.897 8.167 20.447 3.313 3.221 7.509 5.712 11.997 6.885 5.356 1.399 11.326.916 16.83.923l22.578.02c3.801.005 7.709-.178 11.499.038l-.196.033c-2.535.402-5.176.074-7.732.352l13.815.095c-1.53.457-3.163-.332-4.652.545l-.17-.045c-.644-.163-1.078-.149-1.732-.037l-.087.455.306.38-.033.148c-.11.525-.096.885.024 1.404-.63 1.561-1.957 1.377-2.123 3.365.498.459 1.569.303 1.607.848.02.288-.109.582-.206.849.413.244.765.447 1.232.564-.172.138-.434.415-.626.5-.629.277-6.1 0-7.125 0v.13l20.588.073.195.259c-2.103.288-4.613.039-6.765.04l-15.058.003-25.368.004c-6.05.003-12.129.188-18.155-.406-2.64-.261-5.728-1.096-8.146-2.203-8.028-3.678-14.976-10.057-18.216-18.427-1.036-2.677-1.456-5.621-2.45-8.314V61.295Z"
    transform="scale(.67976 .66742)"
  />
  <path
    fill="#434DFD"
    d="m63.992 21.362 20.688-.044h38.99l19.749.006c3.517 0 7.375-.293 10.849.212 4.067.592 8.63 2.497 11.724 5.219l.346.38c-.17-.02-.463-.006-.576-.127-.834-.903-2.243-1.537-3.258-2.26-1.6-1.14-4.337-2.221-6.285-2.492-.252-.035-.483-.114-.724-.188-.56-.17-1.12-.053-1.69-.282-.457-.183-1.045-.063-1.528-.026l-.023.122c-.045.176-.11.235-.238.358l-.098-.02c-1.104-.208-2.156.41-3.305.417l.094.14 1.31.289c.147.428.303.848.38 1.295l.455.33-.02.927c.335.136.472.042.747.11.457.11.743.685.906 1.059-.239.331-.479.505-.892.58l-.176.026-.27.274.185.116.1-.022c.606-.077 1.23.184 1.743.467.142.079.256.074.412.094.271.034.51.154.804.181.199.141.417.37.658.341.204-.025.348.034.532.107l.574.223c1.025.388 2.409 1.079 3.25 1.78.404.336.657.508.845 1.02-2.455-1.764-5.324-3.234-8.37-3.692-3.2-.482-6.69-.234-9.936-.237l-17.792-.001-64.423-.032c-.954-.214-1.858-.069-2.799-.194-2.82-.374-5.81-.207-8.667-.202l-.085-.14c.33-.138.59-.258.96-.215.15.018.237.05.383-.002.085-.03.167-.07.253-.096l.123-.037-.106-.346-.326.04c-.35-.356-1.1-.501-1.328-.842-.163-.245-.365-.434-.573-.643.075-.322.055-.491-.068-.797l-.565-.307c-.345-.213-.506-.489-.585-.876-.187-.92-.747-.647-1.233-1.2.603-.307.761-.164 1.366-.245 1.667-.221 3.403-.135 5.1-.133 2.252.002 4.643.162 6.88-.005.388-.028.732-.157 1.14-.17 1.394-.043 2.885.046 4.254-.212l.14-.028Z"
  />
  <path
    fill="#71BCD4"
    d="m167.24 121.15.232-1.322c.088.781.095 1.677.29 2.43.204.782-.39 1.41-.086 2.3.225.095.424.177.615.333l.09-.01c.376-.032.638.04.988.162l.092-.04c.788-.328 1.874-.095 2.727-.116.55-.013.858-.196 1.408-.025.128-.228.245-.43.424-.623v5.87l-.054.114c-.686 1.493-.846 3.236-1.48 4.775-2.306 5.596-6.922 10.639-12.741 12.84-1.648.623-3.489 1.255-5.258 1.409l-.255-.169c-.295-.16-.628-.165-.945-.076-.135.039-.222.09-.367.089l-2.862.077a2.158 2.158 0 0 0-.442-.267l-.154-.067c.306-.238.463-.214.845-.256-.001-.394.01-.673-.23-1.012-.099-.14.002-.468.026-.642-.33-.686-.7-2.092-1.233-2.598l-.06-.052.618-.497.028-.36c-.75-.023-1.43-.15-2.16-.316 1.239-.01 4.477.164 5.379-.582l.078-.072c.953-.379 1.953-.596 2.907-.982 2.197-.887 4.348-2.246 6.039-3.884 2.556-2.475 4.49-5.72 5.144-9.212.444-2.374.378-4.813.397-7.218Z"
  />
  <path
    fill="#49F3C6"
    d="M55.11 142.857c2.479-.217 5.166-.027 7.667-.027l15.912-.003 50.304.006 13.375.006c3.452-.003 6.961.11 10.385-.392l-.078.072c-.902.746-4.14.572-5.378.582.73.166 1.41.293 2.16.317l-.029.359-.618.497.06.052c.533.506.904 1.912 1.233 2.598-.024.174-.125.503-.027.642.24.34.23.618.23 1.012-.38.042-.538.018-.844.256l.154.067c.168.074.296.159.442.267l2.862-.077c.145 0 .232-.05.367-.089.317-.09.65-.085.945.076l.255.169c-4.784.55-9.78.258-14.596.258H80.999l-11.072-.002c-1.959 0-3.968.086-5.922-.027l-.132-.172-13.995-.05v-.086c.697 0 4.416.185 4.843 0 .13-.057.308-.241.426-.334-.318-.078-.557-.213-.838-.376.066-.178.154-.374.14-.567-.026-.363-.754-.26-1.092-.566.112-1.326 1.014-1.204 1.443-2.245a1.91 1.91 0 0 1-.017-.938l.023-.098-.208-.254.06-.304c.444-.074.739-.084 1.176.025l.116.03c1.012-.585 2.122-.059 3.162-.364l-9.39-.063c1.737-.186 3.532.033 5.255-.235l.133-.022Z"
  />
</svg>


  </div>
);

const HustonError = (props: {width: number, height:number})  => (
  // wrap the svg in a div that scales the size with height and width props
  <div style={{height: props.height, width: props.width}}>    
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width={175}
      height={131}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
      viewBox="0 0 175 131"
      style={{height: props.height, width: props.width}}
      >
      <path
          fill="#f49090"
          d="M55.977 81.512c0 8.038-6.516 14.555-14.555 14.555S26.866 89.55 26.866 81.512c0-8.04 6.517-14.556 14.556-14.556 8.039 0 14.555 6.517 14.555 14.556Zm24.745-5.822c0-.804.651-1.456 1.455-1.456h11.645c.804 0 1.455.652 1.455 1.455v11.645c0 .804-.651 1.455-1.455 1.455H82.177a1.456 1.456 0 0 1-1.455-1.455V75.689Zm68.411 5.822c0 8.038-6.517 14.555-14.556 14.555-8.039 0-14.556-6.517-14.556-14.555 0-8.04 6.517-14.556 14.556-14.556 8.039 0 14.556 6.517 14.556 14.556Z"
      />
      <rect
          width={168.667}
          height={125}
          x={3.667}
          y={3}
          stroke="#f49090"
          strokeWidth={4}
          rx={20.289}
      />
      </svg>
  </div>
)