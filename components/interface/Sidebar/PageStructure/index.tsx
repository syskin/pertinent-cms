import { Tag, TAG_PAGE } from '../../../../types/tags'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { deleteTag, setActiveTag } from '../../../../store/actions/tags'
import TagConfiguration from '../../../form/TagConfiguration'

const PageStructure: React.FC = () => {
  const { tree, activeTag } = useSelector((state: RootState) => state.tags)
  return (
    <div>
      <div>Component tags structure</div>

      <div className="overflow-y-auto h-72">
        <TagsLoop tags={tree} />
      </div>

      <TagConfiguration type={`create`} wrapper_type={TAG_PAGE} />
      {addChild(activeTag)}
    </div>
  )
}

interface TagsLoopProps {
  tags: Tag[] | undefined
}

const TagsLoop: React.FC<TagsLoopProps> = ({ tags }) => {
  const dispatch = useDispatch()
  const { activeTag } = useSelector((state: RootState) => state.tags)
  const handleSelect = (tagId: number | undefined): void => {
    if (tagId) {
      dispatch(setActiveTag(tagId))
    }
  }
  const handleDelete = (tagId: number | undefined): void => {
    if (tagId) {
      dispatch(deleteTag(tagId))
    }
  }
  const baseButtonStyle = ``
  return (
    <div className="flex flex-col ml-2">
      {tags?.map((tag, index) => {
        return (
          <div
            className={
              tag.id === activeTag?.id
                ? `bg-green-500 ${baseButtonStyle}`
                : `bg-gray-100 ${baseButtonStyle}`
            }
            key={`tag_${index}`}
          >
            <button onClick={() => handleSelect(tag?.id)}>Select {tag.id}</button>
            <button onClick={() => handleDelete(tag?.id)}>Delete</button>
            {getChildren(tag)}
          </div>
        )
      })}
    </div>
  )
}

function getChildren(tag: Tag): JSX.Element | undefined {
  if (tag && tag.children && tag.children.length > 0) return <TagsLoop tags={tag.children} />
}

function addChild(activeTag: Tag | undefined): JSX.Element | undefined {
  if (activeTag && activeTag.id)
    return (
      <div>
        <TagConfiguration type={`edit`} wrapper_type={TAG_PAGE} />
      </div>
    )
}

export default PageStructure
