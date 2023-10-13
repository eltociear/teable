import { AddActionDropMenu } from '../../components';
// import { DraggableAction } from './actions';
import { DraggableAction } from './actions';
import { Trigger } from './Trigger';

const WorkFlow = () => {
  return (
    <div className="pt-10 h-full">
      <Trigger></Trigger>
      <DraggableAction></DraggableAction>
      <div className="py-8 pl-[88px]">
        <AddActionDropMenu>
          <div className="w-96 hover:opacity-60 mr-1 border-2 border-gray-400 cursor-pointer rounded h-16 flex items-center justify-center border-dashed">
            Add advanced logic or action
          </div>
        </AddActionDropMenu>
      </div>
    </div>
  );
};

export { WorkFlow };
