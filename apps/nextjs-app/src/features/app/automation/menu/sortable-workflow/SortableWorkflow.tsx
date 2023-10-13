import {
  DndContext,
  MouseSensor,
  useSensor,
  useSensors,
  rectIntersection,
  TouchSensor,
  DragOverlay,
  MeasuringStrategy,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import type {
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  UniqueIdentifier,
  DropAnimation,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DeploymentStatus } from '@teable-group/core';
import { DraggableHandle, MoreHorizontal, ChevronRight } from '@teable-group/icons';
import { useIsHydrated } from '@teable-group/sdk/hooks';
import { Button } from '@teable-group/ui-lib';
import { useLocalStorage } from '@uidotdev/usehooks';
import classNames from 'classnames';
import { cloneDeep } from 'lodash';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import { DroppableContainer } from './DroppableContainer';
import { WorkflowCard } from './WorkflowCard';

const SortableWorkflow = () => {
  const [sections, setSection] = useState([
    {
      id: 'wscG4F4NKAbVvbeP9',
      name: 'Section 6',
      createdByUserId: 'usrFuA5z4RkvrR1w9',
      isDefaultSection: null,
      workflowOrder: [
        {
          id: 'wflCvAIbHaa5E42hp',
          applicationId: 'appiwng3MMPSrZvgg',
          name: 'Section 6 - 1',
          description: 'section6-1',
          version: 5,
          liveWorkflowDeploymentVersion: null,
          targetWorkflowDeploymentId: null,
          deploymentStatus: 'undeployed',
          deploymentError: null,
          origin: null,
          trigger: {
            id: 'wtrghvbmrQ42MpZoU',
            workflowTriggerTypeId: 'wttFORMSUBMITTED0',
          },
          graph: {
            id: 'wgrHJYgMes33p2xdO',
            entryWorkflowActionId: 'wacjN2NunfFsop7fL',
            alwaysGroupName: null,
            alwaysGroupDescription: null,
            actionsById: null,
          },
        },
        {
          id: 'wflCvAIbHaa5E42ha',
          applicationId: 'appiwng3MMPSrZvgg',
          name: 'Section 6 - 2',
          description: 'section6-2',
          version: 5,
          liveWorkflowDeploymentVersion: null,
          targetWorkflowDeploymentId: null,
          deploymentStatus: 'undeployed',
          deploymentError: null,
          origin: null,
          trigger: {
            id: 'wtrghvbmrQ42MpZoU',
            workflowTriggerTypeId: 'wttFORMSUBMITTED0',
          },
          graph: {
            id: 'wgrHJYgMes33p2xdO',
            entryWorkflowActionId: 'wacjN2NunfFsop7fL',
            alwaysGroupName: null,
            alwaysGroupDescription: null,
            actionsById: null,
          },
        },
      ],
      applicationId: 'appiwng3MMPSrZvgg',
      fractionalIndex: 'a5',
    },
    {
      id: 'wscGPvbo4Nw0wpWy3',
      name: 'Section 4',
      createdByUserId: 'usrFuA5z4RkvrR1w9',
      isDefaultSection: null,
      workflowOrder: [
        {
          id: 'wflCvAIbHaa5E42hq',
          applicationId: 'appiwng3MMPSrZvgg',
          name: 'Section 4 - 1',
          description: null,
          version: 5,
          liveWorkflowDeploymentVersion: null,
          targetWorkflowDeploymentId: null,
          deploymentStatus: 'undeployed',
          deploymentError: null,
          origin: null,
          trigger: {
            id: 'wtrghvbmrQ42MpZoU',
            workflowTriggerTypeId: 'wttFORMSUBMITTED0',
          },
          graph: {
            id: 'wgrHJYgMes33p2xdO',
            entryWorkflowActionId: 'wacjN2NunfFsop7fL',
            alwaysGroupName: null,
            alwaysGroupDescription: null,
            actionsById: {
              wacjN2NunfFsop7fL: {
                id: 'wacjN2NunfFsop7fL',
                workflowActionTypeId: 'watCREATERECORD00',
                nextWorkflowActionId: 'wdehnB5lFwSUkwQG7',
              },
              wacqU1cywQ8IIv15s: {
                id: 'wacqU1cywQ8IIv15s',
                workflowActionTypeId: 'watBETUHIcuho4hit',
                nextWorkflowActionId: null,
              },
              wdehnB5lFwSUkwQG7: {
                id: 'wdehnB5lFwSUkwQG7',
                workflowDecisionTypeId: 'wdtNWAY0000000000',
                nextWorkflowNodeIds: ['wacqU1cywQ8IIv15s'],
              },
            },
          },
        },
      ],
    },
    {
      id: 'wscb6axXWLNge6I0N',
      name: 'More',
      createdByUserId: 'usrFuA5z4RkvrR1w9',
      // 默认
      isDefaultSection: true,
      // 排序
      workflowOrder: [],
    },
  ]);

  const isHydrated = useIsHydrated();
  const sectionIds = sections.map((item) => item.id);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  const router = useRouter();
  const {
    query: { automationId },
  } = router;
  const [collapseIds] = useLocalStorage<string[]>('workflowsListStates', []);

  const isActive = (id: string) => id === automationId;

  const handleDragEnd = (data: DragEndEvent) => {
    const { over, active } = data;
    if (!over) {
      return;
    }
    const overSection = findSectionId(over.id);
    const activeSection = findSectionId(active.id);

    // section drag
    if (sectionIds.includes(active?.id as string)) {
      const from = active?.data?.current?.sortable?.index;
      const to = over?.data?.current?.sortable?.index;

      const newList = [...sections];
      newList.splice(to, 0, ...newList.splice(from, 1));
      setSection(newList);
      setDraggingId(null);
      return;
    }
    // same section action item drag
    if (overSection === activeSection) {
      const newList = cloneDeep(sections);
      const index = newList.findIndex(({ id }) => id === overSection);
      const from = active?.data?.current?.sortable?.index;
      const to = over?.data?.current?.sortable?.index;
      newList[index].workflowOrder.splice(to, 0, ...newList[index].workflowOrder.splice(from, 1));
      setSection(newList);
      setDraggingId(null);
    }
    //  else {
    //   // item to another section
    //   const newList = cloneDeep(list);
    //   const delIndex = newList.findIndex(({ id }) => id === activeSection);
    //   const addIndex = newList.findIndex(({ id }) => id === overSection);

    //   const del = newList[delIndex].items.splice(active?.data?.current?.sortable?.index, 1);
    //   newList[addIndex].items.splice(over?.data?.current?.sortable?.index, 0, ...del);
    //   setList(newList);
    // }
  };

  const handleDragStart = (params: DragStartEvent) => {
    const {
      active: { id },
    } = params;
    setDraggingId(id as string);
  };

  const handleDragOver = (params: DragOverEvent) => {
    const { active, over } = params;
    const overId = over?.id;
    if (overId == null || sectionIds.includes(active.id as string)) {
      return;
    }
    const activeContainer = findSectionId(active.id);
    const overContainer = findSectionId(overId);

    if (!overContainer || !activeContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      const newList = cloneDeep(sections);
      const delIndex = newList.findIndex(({ id }) => id === activeContainer);
      const addIndex = newList.findIndex(({ id }) => id === overContainer);

      const del = newList[delIndex].workflowOrder.splice(active?.data?.current?.sortable?.index, 1);
      newList[addIndex].workflowOrder.splice(over?.data?.current?.sortable?.index, 0, ...del);
      setSection(newList);
    }
  };

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const findSectionId = (ID: UniqueIdentifier) => {
    let res = null;
    const index = sections.findIndex(({ id }) => id === ID);
    sections.forEach(({ id, workflowOrder }) => {
      const ids = workflowOrder.map(({ id }) => id);
      if (ids.includes(ID as string)) {
        res = id;
      }
    });
    if (index > -1) {
      res = sections[index].id;
    }
    return res;
  };

  const renderSectionOverlay = (draggingId: string | null) => {
    const sectionInfo = sections.find(({ id }) => id === draggingId);
    const open = true;
    return draggingId ? (
      <Button
        variant="ghost"
        className={classNames('w-full flex justify-between cursor-grab px-3 items-center')}
      >
        <ChevronRight
          className={classNames('w-4 h-4 ease-in-out duration-300', open ? 'rotate-90' : '')}
        />
        <div className="flex text-left flex-1 truncate">{sectionInfo?.name} 123</div>
        <div className="flex items-center text-slate-400">
          <MoreHorizontal></MoreHorizontal>
          <DraggableHandle></DraggableHandle>
        </div>
      </Button>
    ) : null;
  };

  const renderWorkflowOverlay = (id: string | null) => {
    const sectionId = findSectionId(id as string);
    return id ? (
      <WorkflowCard
        deploymentStatus={DeploymentStatus.Deployed}
        id={id}
        className="border rounded-sm bg-slate-300"
      ></WorkflowCard>
    ) : null;
  };

  return isHydrated ? (
    <div className="p-2">
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        collisionDetection={rectIntersection}
        sensors={sensors}
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          },
        }}
      >
        <SortableContext items={sections} strategy={verticalListSortingStrategy}>
          {sections.map(({ name, id: sectionId, workflowOrder }) => (
            <DroppableContainer id={sectionId} name={name} workFlow={workflowOrder} key={sectionId}>
              <SortableContext items={workflowOrder} strategy={verticalListSortingStrategy}>
                {workflowOrder.map(({ id, name, description, deploymentStatus }) => (
                  <WorkflowCard
                    id={id}
                    key={id}
                    deploymentStatus={DeploymentStatus.Deployed}
                    name={name}
                    description={description}
                    className={
                      collapseIds.includes(sectionId)
                        ? ''
                        : isActive(id) || draggingId === id
                        ? ''
                        : 'hidden'
                    }
                  ></WorkflowCard>
                ))}
              </SortableContext>
            </DroppableContainer>
          ))}
        </SortableContext>
        {draggingId &&
          createPortal(
            <DragOverlay adjustScale={false} dropAnimation={dropAnimation}>
              {sectionIds.includes(draggingId)
                ? renderSectionOverlay(draggingId)
                : renderWorkflowOverlay(draggingId)}
            </DragOverlay>,
            document?.body
          )}
      </DndContext>
    </div>
  ) : null;
};

export { SortableWorkflow };
