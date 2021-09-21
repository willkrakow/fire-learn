import React from 'react'
import { CircularProgress, Tabs, Tab } from '@material-ui/core'
import ContentEditor from './MarkdownEditor'
import { RouteComponentProps  } from 'react-router'
import { useLesson } from '../../hooks'
import TabPanel from './TabPanel'
import LessonMetadataEditor from './LessonMetadataEditor'
import { a11yProps } from '../../utils'

interface TParams {
  lessonId: string;
}


const LessonEditor = ({ match }: RouteComponentProps<TParams>) => {
  const { lessonId } = match.params
  const { lessonData, loading } = useLesson(lessonId) as {lessonData: Lesson, loading: boolean}
  const [ lessonUpdates, setLessonUpdates ] = React.useState<Lesson | any>(null)
  const [tabValue, setTabValue] = React.useState(0)

  React.useEffect(() => {
    if (lessonData && !lessonUpdates) {
      setLessonUpdates(lessonData)
    }

  }, [lessonData])

  const handleTabChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && lessonUpdates?.data && (
        <>
        <Tabs variant="fullWidth" value={tabValue} onChange={handleTabChange}>
          <Tab label="Metadata" {...a11yProps(0)} />
          <Tab label="Content" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <LessonMetadataEditor lessonId={lessonId} />
        </TabPanel>
          <TabPanel value={tabValue} index={1}>
          {!loading && lessonData &&<ContentEditor lessonData={lessonData} loading={loading} />}
          </TabPanel>
        </>
      )}
    </>
  );}

export default LessonEditor