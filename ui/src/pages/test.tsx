import { HostEventsOverview } from '@/components/host-events'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  const renderMain = () => {
    return (
        <Button variant="outline" size="lg">
            Click Me
        </Button>
    )
  }

  return (
    <div>
        <h1>Test Page</h1>
        {renderMain()}
    </div>
  )
}
